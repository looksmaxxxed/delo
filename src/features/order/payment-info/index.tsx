import type { ReactNode } from 'react';
import type { PublicOrderSummary } from '../common/types';
import { PaymentInfoSection } from './ui/payment-info-section';

type PublicOrderPaymentInfoProps = {
  order: PublicOrderSummary;
  payments: ReactNode;
};

export function PublicOrderPaymentInfo(props: PublicOrderPaymentInfoProps) {
  const { order, payments } = props;

  return <PaymentInfoSection order={order} payments={payments} />;
}
