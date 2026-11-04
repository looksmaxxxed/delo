import type { PublicOrderSlots, PublicOrderSummary } from './common/types';
import { PublicOrderView } from './common/ui/public-order-view';
import { PublicOrderPaymentInfo } from './payment-info';
import { PublicOrderConfirmation } from './confirmation';

type PublicOrderFeatureProps = PublicOrderSlots & { order: PublicOrderSummary; token: string };

export function PublicOrderFeature(props: PublicOrderFeatureProps) {
  const { order, token, payments, ...slots } = props;

  return (
    <PublicOrderView
      {...slots}
      paymentInfo={<PublicOrderPaymentInfo order={order} payments={payments} />}
      confirmation={<PublicOrderConfirmation order={order} token={token} />}
    />
  );
}
