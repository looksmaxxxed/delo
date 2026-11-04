'use client';

import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { DataTable } from '@/shared/components/ui/data/data-table';
import type { OrderListItem } from '@/shared/types/orders';
import { ORDERS_TABLE_COLUMNS } from '../constants';

type OrdersTableProps = {
  items: OrderListItem[];
  emptyMessage: string;
  isLoading: boolean;
  isLoadingMore: boolean;
  onRowClick: (order: OrderListItem) => void;
  onEndReached?: () => Promise<void>;
};

export function OrdersTable(props: OrdersTableProps) {
  const { items, emptyMessage, isLoading, isLoadingMore, onRowClick, onEndReached } = props;
  const table = useReactTable({
    data: items,
    columns: ORDERS_TABLE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable
      table={table}
      emptyMessage={emptyMessage}
      isLoading={isLoading}
      onRowClick={onRowClick}
      onEndReached={onEndReached}
      isLoadingMore={isLoadingMore}
      className="hidden xl:flex"
    />
  );
}
