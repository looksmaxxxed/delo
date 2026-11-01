'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { confirmOrderByClient } from '@/actions/order-reports';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import type { PublicOrderSummary } from './types';
import { PaymentInfoSection } from './ui/payment-info-section';
import { ConfirmOrderButton } from './ui/confirm-order-button';

type PublicOrderPaymentInfoProps = {
  order: PublicOrderSummary;
  token: string;
  payments: ReactNode;
};

export function PublicOrderPaymentInfo(props: PublicOrderPaymentInfoProps) {
  const { order, token, payments } = props;
  const router = useRouter();

  async function handleConfirm() {
    const { error } = await confirmOrderByClient(token);
    if (error) throw new Error(error);
    toast.success('Условия подтверждены');
    router.refresh();
  }

  const [execute, isLoading] = useAsyncAction(handleConfirm);

  return (
    <PaymentInfoSection
      order={order}
      payments={payments}
      confirmation={<ConfirmOrderButton isLoading={isLoading} onConfirm={execute} />}
    />
  );
}
