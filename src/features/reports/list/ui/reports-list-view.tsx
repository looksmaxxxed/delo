'use client';

import type { ChangeEvent } from 'react';
import type { OrderReportStatus } from '@prisma/client';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { FilterCard } from '@/shared/components/ui/data/filter-card';
import { DatePicker } from '@/shared/components/ui/form/primitives/date-picker';
import { SelectInput } from '@/shared/components/ui/form/fields/select-input';
import { ORDER_REPORT_STATUS_FILTER_OPTIONS } from '@/shared/constants/reports';
import type { OrderReportListItem } from '@/shared/types/reports';
import { ReportsTable } from './reports-table';

type ReportsListViewProps = {
  items: OrderReportListItem[];
  hasMore: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  now: number;
  statusFilter: OrderReportStatus | null;
  searchFilter: string;
  fromFilter: string;
  toFilter: string;
  retryingReportId: string | null;
  isRetrying: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: OrderReportStatus | null) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onRetry: (reportId: string) => void;
  onLoadMore: () => Promise<void>;
};

export function ReportsListView(props: ReportsListViewProps) {
  const {
    items,
    hasMore,
    isRefreshing,
    isLoadingMore,
    now,
    statusFilter,
    searchFilter,
    fromFilter,
    toFilter,
    retryingReportId,
    isRetrying,
    onSearchChange,
    onStatusChange,
    onFromChange,
    onToChange,
    onRetry,
    onLoadMore,
  } = props;
  const statusOption =
    ORDER_REPORT_STATUS_FILTER_OPTIONS.find((option) => option.value === statusFilter) ?? null;
  const hasFilters = !!(statusFilter || searchFilter || fromFilter || toFilter);

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  function handleStatusChange(option: string | null) {
    const value = option ?? null;
    onStatusChange(value === 'ALL' ? null : (value as OrderReportStatus));
  }

  return (
    <AnimateIn className="flex flex-1 flex-col gap-4">
      <FilterCard
        filterValue={searchFilter}
        onFilterChange={handleSearchChange}
        inputLabel="Поиск по клиенту или заказу..."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">
          <SelectInput
            value={statusOption}
            onValueChange={handleStatusChange}
            options={ORDER_REPORT_STATUS_FILTER_OPTIONS}
            className="bg-surface/30 min-w-44 backdrop-blur-xl data-[size=default]:h-11"
            label="Фильтр по статусу"
          />
          <DatePicker
            value={fromFilter}
            onChange={onFromChange}
            label="Дата от"
            className="bg-surface/30 h-11 min-w-40 backdrop-blur-xl"
          />
          <DatePicker
            value={toFilter}
            onChange={onToChange}
            label="Дата до"
            className="bg-surface/30 h-11 min-w-40 backdrop-blur-xl"
          />
        </div>
      </FilterCard>

      <ReportsTable
        items={items}
        emptyMessage={hasFilters ? 'Ничего не найдено' : 'Отчётов пока нет'}
        isLoading={isRefreshing}
        isLoadingMore={isLoadingMore}
        now={now}
        retryingReportId={retryingReportId}
        isRetrying={isRetrying}
        onRetry={onRetry}
        onEndReached={hasMore && !isRefreshing && !isLoadingMore ? onLoadMore : undefined}
      />
    </AnimateIn>
  );
}
