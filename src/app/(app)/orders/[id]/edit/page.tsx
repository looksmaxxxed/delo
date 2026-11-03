import { notFound } from 'next/navigation';
import { PageHeader } from '@/shared/components/layout/page-header';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { OrderEditor } from '@/features/orders/editor';
import { orderToFormValues } from '@/features/orders/editor/utils';
import { getOrder } from '@/actions/orders';
import { RETURN_TO } from '@/constants/navigation';
import { getBackLink } from '@/shared/utils/navigation';

type EditOrderPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [RETURN_TO]?: string | string[] }>;
};

export default async function EditOrderPage(props: EditOrderPageProps) {
  const { params, searchParams } = props;
  const { id } = await params;
  const query = await searchParams;
  const backLink = getBackLink(query[RETURN_TO], `/orders/${id}`);

  const order = await getOrder(id);
  if (!order) notFound();

  const defaultValues = orderToFormValues(order);

  return (
    <AnimateIn className="page-stack flex-1">
      <PageHeader
        title={`Редактировать: ${order.title}`}
        description={`Клиент: ${order.clientName}`}
        showIcon={false}
        backLink={{ href: backLink, label: 'заказу' }}
      />
      <OrderEditor
        mode="edit"
        orderId={id}
        defaultClient={{ id: order.clientId, name: order.clientName }}
        defaultValues={defaultValues}
      />
    </AnimateIn>
  );
}
