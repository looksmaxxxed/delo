'use client';

import type { ChangeEvent, ReactNode } from 'react';
import { FileText } from 'lucide-react';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { AppDialog } from '@/shared/components/ui/overlay/dialog';
import { SelectInput } from '@/shared/components/ui/form/fields/select-input';
import type { OrderListItem } from '@/types/orders';
import type { OrderStatus } from '@prisma/client';
import { ORDER_STATUS_FILTER_OPTIONS } from '../constants';
import { FilterCard } from '@/shared/components/ui/data/filter-card';
import { OrdersTable } from './orders-table';

type OrdersListViewProps = {
  items: OrderListItem[];
  hasMore: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  statusFilter: OrderStatus | null;
  searchFilter: string;
  createOpen: boolean;
  createForm: ReactNode;
  onSelectOrder: (order: OrderListItem) => void;
  onCreate: () => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: OrderStatus | null) => void;
  onCreateOpenChange: (value: boolean) => void;
  onLoadMore: () => Promise<void>;
};

export function OrdersListView(props: OrdersListViewProps) {
  const {
    items,
    hasMore,
    isRefreshing,
    isLoadingMore,
    statusFilter,
    searchFilter,
    createOpen,
    createForm,
    onSelectOrder,
    onCreate,
    onSearchChange,
    onStatusChange,
    onCreateOpenChange,
    onLoadMore,
  } = props;

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onSearchChange(e.target.value);
  }

  function handleStatusChange(option: string | null) {
    const value = option ?? null;
    onStatusChange(value === 'ALL' ? null : (value as OrderStatus));
  }

  const statusOption =
    ORDER_STATUS_FILTER_OPTIONS.find((opt) => opt.value === statusFilter) ?? null;

  return (
    <AnimateIn className="flex flex-1 flex-col gap-4">
      <FilterCard
        filterValue={searchFilter}
        onFilterChange={handleSearchChange}
        onBtnAction={onCreate}
        btnLabel="Новый заказ"
        inputLabel="Поиск по заказам..."
      >
        <SelectInput
          value={statusOption}
          onValueChange={handleStatusChange}
          options={ORDER_STATUS_FILTER_OPTIONS}
          className="bg-surface/30 min-w-44 backdrop-blur-xl data-[size=default]:h-11"
          label="Фильтр по статусу"
        />
      </FilterCard>

      <OrdersTable
        items={items}
        emptyMessage={searchFilter || statusFilter ? 'Ничего не найдено' : 'Заказов пока нет'}
        isLoading={isRefreshing}
        onRowClick={onSelectOrder}
        onEndReached={hasMore && !isRefreshing && !isLoadingMore ? onLoadMore : undefined}
        isLoadingMore={isLoadingMore}
      />

      <AppDialog
        open={createOpen}
        onOpenChange={onCreateOpenChange}
        title="Новый заказ"
        description="Создайте новый заказ"
        Icon={FileText}
        size="lg"
        variant="solid"
      >
        {createForm}
      </AppDialog>
    </AnimateIn>
  );
}
