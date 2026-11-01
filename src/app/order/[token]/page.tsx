import { getPublicOrder } from '@/actions/public-orders';
import { OrderHero } from '@/features/order/common/ui/order-hero';
import { OrderItemsSection } from '@/features/order/common/ui/order-items-section';
import { OrderStatusProgress } from '@/features/order/common/ui/order-status-progress';
import { PublicOrderFeature } from '@/features/order';
import { PublicPayments } from '@/features/order/payment-info/ui/public-payments';
import { WorkTermsSection } from '@/features/order/common/ui/work-terms-section';

type PublicOrderPageProps = {
  params: Promise<{ token: string }>;
};

export default async function PublicOrderPage(props: PublicOrderPageProps) {
  const { params } = props;
  const { token } = await params;

  const order = await getPublicOrder(token);

  return (
    <PublicOrderFeature
      order={{
        status: order.status,
        isTermsAccepted: order.isTermsAccepted,
        price: order.price,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        totalPaid: order.totalPaid,
      }}
      token={token}
      hero={<OrderHero order={order} />}
      statusProgress={<OrderStatusProgress status={order.status} statusDates={order.statusDates} />}
      workItems={<OrderItemsSection items={order.items} />}
      workTerms={<WorkTermsSection order={order} />}
      payments={<PublicPayments payments={order.payments} />}
    />
  );
}
