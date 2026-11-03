import { notFound } from 'next/navigation';
import type { Route } from 'next';
import { PageHeader } from '@/shared/components/layout/page-header';
import { ConfirmationProvider } from '@/shared/components/providers/confirmation/confirmation.provider';
import { OrderDetailsFeature } from '@/features/orders/details';
import { OrderInformation } from '@/features/orders/details/ui/order-information';
import { OrderWorkItems } from '@/features/orders/details/ui/order-work-items';
import { PaymentsSection } from '@/features/orders/details/ui/payments-section';
import { ActivityLog } from '@/features/orders/details/ui/activity-log';
import { getOrder } from '@/actions/orders';
import { env } from '@/shared/config/env';
import { RETURN_TO } from '@/shared/constants/navigation';
import { getBackLink } from '@/shared/utils/navigation';

type OrderPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [RETURN_TO]?: string | string[] }>;
};

export default async function OrderPage(props: OrderPageProps) {
  const { params, searchParams } = props;
  const { id } = await params;
  const query = await searchParams;
  const backLink = getBackLink(query[RETURN_TO], '/orders');
  const order = await getOrder(id);
  if (!order) notFound();
  const publicOrderUrl = new URL(`/order/${order.publicToken}`, env.NEXT_PUBLIC_APP_URL).toString();

  return (
    <div className="page-stack flex-1">
      <PageHeader
        title={order.title}
        description={`Заказ · ${order.clientName}`}
        showIcon={false}
        backLink={{ href: backLink, label: 'заказам' }}
      />
      <ConfirmationProvider>
        <OrderDetailsFeature
          orderId={order.id}
          currentStatus={order.status}
          documents={order.documents}
          latestReadyReportId={order.latestReadyReportId}
          publicOrderUrl={publicOrderUrl}
          editHref={`/orders/${id}/edit` as Route<string>}
          information={<OrderInformation order={order} />}
          workItems={<OrderWorkItems items={order.items} />}
          payments={
            <PaymentsSection
              payments={order.payments}
              paymentStatus={order.paymentStatus}
              orderPrice={order.price}
            />
          }
          activity={<ActivityLog activities={order.activities} />}
        />
      </ConfirmationProvider>
    </div>
  );
}
