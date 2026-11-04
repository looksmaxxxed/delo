'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { confirmOrderByClient } from '@/actions/reports';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { OrderConfirmationSection } from '../common/ui/order-confirmation-section';
import type { PublicOrderSummary } from '../common/types';
import { ConfirmOrderButton } from './ui/confirm-order-button';

type PublicOrderConfirmationProps = {
  order: Pick<PublicOrderSummary, 'status' | 'isTermsAccepted'>;
  token: string;
};

export function PublicOrderConfirmation(props: PublicOrderConfirmationProps) {
  const { order, token } = props;
  const router = useRouter();

  async function handleConfirm() {
    const { error } = await confirmOrderByClient(token);
    if (error) throw new Error(error);
    toast.success('Условия подтверждены');
    router.refresh();
  }

  const [execute, isLoading] = useAsyncAction(handleConfirm);

  return (
    <OrderConfirmationSection
      order={order}
      action={<ConfirmOrderButton isLoading={isLoading} onConfirm={execute} />}
    />
  );
}
