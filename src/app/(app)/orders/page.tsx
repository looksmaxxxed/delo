import { ORDERS_PAGE_SIZE } from '@/constants/pagination';
import { OrdersList } from '@/features/orders/list';
import { getOrders } from '@/actions/orders';
import { OrderStatus } from '@prisma/client';

type OrdersPageProps = {
  searchParams: Promise<{ status?: OrderStatus; search?: string }>;
};

export default async function OrdersPage(props: OrdersPageProps) {
  const { searchParams } = props;
  const { status, search } = await searchParams;

  const { items, hasMore } = await getOrders({
    offset: 0,
    take: ORDERS_PAGE_SIZE,
    status,
    search,
  });

  const listKey = `${status ?? ''}-${search ?? ''}-${items[0]?.id ?? 'empty'}`;

  return (
    <div className="page-stack flex-1">
      <OrdersList key={listKey} initialItems={items} initialHasMore={hasMore} />
    </div>
  );
}
