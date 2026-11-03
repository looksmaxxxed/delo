'use client';

import { OrderEditor } from '../editor';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';
import { OrderStatus } from '@prisma/client';
import { getOrders } from '@/actions/orders';
import { ORDERS_PAGE_SIZE } from '@/shared/constants/pagination';
import { useInfiniteList } from '@/shared/hooks/use-infinite-list';
import { useRequireVerifiedEmail } from '@/shared/components/providers/email-verification/email-verification.hook';
import type { OrderListItem } from '@/shared/types/orders';
import type { OrdersListOptions } from './types';
import { OrdersListView } from './ui/orders-list-view';

type OrdersListProps = OrdersListOptions;

export function OrdersList(props: OrdersListProps) {
  const { initialItems, initialHasMore } = props;
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    parseAsStringLiteral(Object.values(OrderStatus))
  );
  const [searchFilter, setSearchFilter] = useQueryState('search', parseAsString.withDefault(''));
  const [createOpen, setCreateOpen] = useState(false);
  const requireVerifiedEmail = useRequireVerifiedEmail();

  function fetchOrders(offset: number, take: number) {
    return getOrders({
      offset,
      take,
      status: statusFilter || undefined,
      search: searchFilter || undefined,
    });
  }

  const { items, hasMore, isRefreshing, isLoadingMore, loadMore } = useInfiniteList<OrderListItem>({
    initialItems,
    initialHasMore,
    fetch: fetchOrders,
    pageSize: ORDERS_PAGE_SIZE,
    deps: [statusFilter, searchFilter],
  });

  function selectOrder(order: OrderListItem) {
    router.push(`/orders/${order.id}`);
  }

  function openCreate() {
    if (!requireVerifiedEmail()) return;
    setCreateOpen(true);
  }

  function changeSearch(value: string) {
    setSearchFilter(value);
  }

  function changeStatus(value: OrderStatus | null) {
    setStatusFilter(value);
  }

  function completeCreate() {
    setCreateOpen(false);
    router.refresh();
  }

  return (
    <OrdersListView
      items={items}
      hasMore={hasMore}
      isRefreshing={isRefreshing}
      isLoadingMore={isLoadingMore}
      statusFilter={statusFilter}
      searchFilter={searchFilter}
      createOpen={createOpen}
      onSelectOrder={selectOrder}
      onCreate={openCreate}
      onSearchChange={changeSearch}
      onStatusChange={changeStatus}
      onCreateOpenChange={setCreateOpen}
      onLoadMore={loadMore}
      createForm={<OrderEditor mode="create" onSuccess={completeCreate} />}
    />
  );
}
