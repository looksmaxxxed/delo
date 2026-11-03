'use client';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { DataTable } from '@/shared/components/ui/data/data-table';
import type { OrderReportListItem } from '@/shared/types/reports';
import { createReportsTableColumns } from '../constants';

type ReportsTableProps = {
  items: OrderReportListItem[];
  emptyMessage: string;
  isLoading: boolean;
  isLoadingMore: boolean;
  now: number;
  retryingReportId: string | null;
  isRetrying: boolean;
  onRetry: (reportId: string) => void;
  onEndReached?: () => Promise<void>;
};

export function ReportsTable(props: ReportsTableProps) {
  const {
    items,
    emptyMessage,
    isLoading,
    isLoadingMore,
    now,
    retryingReportId,
    isRetrying,
    onRetry,
    onEndReached,
  } = props;
  const columns = createReportsTableColumns({ now, retryingReportId, isRetrying, onRetry });
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable
      table={table}
      emptyMessage={emptyMessage}
      onEndReached={onEndReached}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
    />
  );
}
