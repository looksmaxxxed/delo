'use client';

import type { Route } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { deleteOrder, updateOrderStatus } from '@/actions/orders';
import { attachOrderReceipt, deleteOrderDocument } from '@/actions/documents';
import { addPayment } from '@/actions/payments';
import { useConfirmation } from '@/shared/components/providers/confirmation/confirmation.hook';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { DeleteIcon } from '@/shared/components/icons/delete';
import { ORDER_DOCUMENT_MAX_BYTES } from '@/shared/constants/documents';
import { PaymentSchema, type PaymentInput } from '@/shared/schemas/payments';
import type { OrderStatus } from '@prisma/client';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import {
  ORDER_FINAL_STATUSES,
  ORDER_STATUS_ICONS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_TRANSITIONS,
} from '@/shared/constants/orders';
import type { OrderDocumentEntry } from '@/shared/types/orders';
import type { OrderDetailsSlots, OrderTransitionAction } from './types';
import { ORDER_STATUS_ACTION_LABELS, PAYMENT_FORM_DEFAULT_VALUES } from './constants';
import { OrderStatusPanel } from './ui/order-status-panel';
import { OrderDocumentsSection } from './ui/order-documents-section';
import { PaymentFormDialog } from './ui/payment-form-dialog';
import { OrderDetailsView } from './ui/order-details-view';

type OrderDetailsFeatureProps = OrderDetailsSlots & {
  orderId: string;
  currentStatus: OrderStatus;
  documents: OrderDocumentEntry[];
  latestReadyReportId: string | null;
  publicOrderUrl: string;
  editHref: Route<string>;
};

export function OrderDetailsFeature(props: OrderDetailsFeatureProps) {
  const {
    orderId,
    currentStatus,
    documents,
    latestReadyReportId,
    publicOrderUrl,
    editHref,
    ...slots
  } = props;
  const canEditOrder = !ORDER_FINAL_STATUSES.some((status) => status === currentStatus);
  const router = useRouter();
  const confirm = useConfirmation();
  const actions: OrderTransitionAction[] = (ORDER_STATUS_TRANSITIONS[currentStatus] ?? []).map(
    (targetStatus) => ({
      targetStatus,
      label: ORDER_STATUS_ACTION_LABELS[targetStatus],
      statusLabel: ORDER_STATUS_LABELS[targetStatus],
      destructive: targetStatus === 'CANCELLED',
      Icon: ORDER_STATUS_ICONS[targetStatus],
    })
  );
  const [open, setOpen] = useState(false);
  const form = useForm<PaymentInput>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: PAYMENT_FORM_DEFAULT_VALUES,
  });
  const { reset } = form;

  function requestTransition(action: OrderTransitionAction) {
    async function performTransition() {
      const { error } = await updateOrderStatus(orderId, action.targetStatus);
      if (error) throw new Error(error);
      toast.success(`Статус: ${action.label}`);
      router.refresh();
    }

    confirm({
      title: 'Вы уверены?',
      description: `Статус заказа будет переведён в «${action.statusLabel}».`,
      confirmLabel: action.label,
      Icon: action.Icon,
      destructive: action.destructive,
      action: performTransition,
    });
  }

  async function uploadDocument(file: File) {
    if (file.size > ORDER_DOCUMENT_MAX_BYTES) {
      throw new Error('Документ должен быть не больше 5 МБ');
    }

    const formData = new FormData();
    formData.append('orderId', orderId);
    formData.append('document', file);

    const { error } = await attachOrderReceipt(formData);
    if (error) throw new Error(error);
    toast.success('Документ прикреплён');
    router.refresh();
  }

  const [upload, isUploading] = useAsyncAction(uploadDocument);

  function requestDelete(documentId: string) {
    async function deleteDocument() {
      const { error } = await deleteOrderDocument(documentId);
      if (error) throw new Error(error);
      toast.success('Документ удалён');
      router.refresh();
    }

    confirm({
      title: 'Удалить документ?',
      description: 'Это действие нельзя отменить. Документ будет удалён навсегда.',
      confirmLabel: 'Удалить',
      Icon: DeleteIcon,
      destructive: true,
      action: deleteDocument,
    });
  }

  function requestDeleteOrder() {
    async function performDeleteOrder() {
      const { error } = await deleteOrder(orderId);
      if (error) throw new Error(error);
      toast.success('Заказ удалён');
      router.push('/orders');
      router.refresh();
    }

    confirm({
      title: 'Удалить заказ?',
      description:
        'Это действие нельзя отменить. Вместе с заказом будут удалены все отчёты, документы, позиции, оплаты и история действий.',
      confirmLabel: 'Удалить заказ',
      Icon: DeleteIcon,
      destructive: true,
      action: performDeleteOrder,
    });
  }

  async function savePayment(data: PaymentInput) {
    const { error } = await addPayment(orderId, data);
    if (error) throw new Error(error);
    toast.success('Оплата добавлена');
    reset(PAYMENT_FORM_DEFAULT_VALUES);
    setOpen(false);
    router.refresh();
  }

  const [submit, isLoading] = useAsyncAction(savePayment);

  function changeOpen(value: boolean) {
    if (!value) reset(PAYMENT_FORM_DEFAULT_VALUES);
    setOpen(value);
  }

  function openPayment() {
    setOpen(true);
  }

  return (
    <AnimateIn className="space-y-6">
      <OrderDetailsView
        {...slots}
        statusPanel={
          <OrderStatusPanel
            currentStatus={currentStatus}
            publicOrderUrl={publicOrderUrl}
            latestReadyReportId={latestReadyReportId}
            canEditOrder={canEditOrder}
            editHref={editHref}
            actions={actions}
            onTransition={requestTransition}
            onDelete={requestDeleteOrder}
          />
        }
        documentsSection={
          <OrderDocumentsSection
            documents={documents}
            isUploading={isUploading}
            onUpload={upload}
            onDelete={requestDelete}
          />
        }
        paymentDialog={
          <PaymentFormDialog
            form={form}
            open={open}
            isLoading={isLoading}
            onSubmit={submit}
            onOpenChange={changeOpen}
            onOpen={openPayment}
          />
        }
      />
    </AnimateIn>
  );
}
