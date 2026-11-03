'use client';

import { useEffect, useRef, useState } from 'react';
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';
import { OrderReportStatus } from '@prisma/client';
import { toast } from 'sonner';
import { getReports, retryOrderReport } from '@/actions/reports';
import { ORDER_REPORT_GENERATION_TIMEOUT_MS } from '@/shared/constants/reports';
import { REPORTS_PAGE_SIZE } from '@/shared/constants/pagination';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { useInfiniteList } from '@/shared/hooks/use-infinite-list';
import type { OrderReportListItem } from '@/shared/types/reports';
import type { ReportsListOptions } from './types';
import { ReportsListView } from './ui/reports-list-view';

type ReportsListProps = ReportsListOptions;

export function ReportsList(props: ReportsListProps) {
  const { initialItems, initialHasMore, initialNow } = props;
  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    parseAsStringLiteral(Object.values(OrderReportStatus))
  );
  const [searchFilter, setSearchFilter] = useQueryState('search', parseAsString.withDefault(''));
  const [fromFilter, setFromFilter] = useQueryState('from', parseAsString.withDefault(''));
  const [toFilter, setToFilter] = useQueryState('to', parseAsString.withDefault(''));
  const [now, setNow] = useState(initialNow);
  const [retryingReportId, setRetryingReportId] = useState<string | null>(null);
  const retryAttemptIdRef = useRef(0);
  const retryExpirationRef = useRef<number | null>(null);

  function fetchReports(offset: number, take: number) {
    return getReports({
      offset,
      take,
      status: statusFilter || undefined,
      search: searchFilter || undefined,
      from: fromFilter || undefined,
      to: toFilter || undefined,
    });
  }

  const { items, hasMore, isRefreshing, isLoadingMore, loadMore, reload, updateItem } =
    useInfiniteList<OrderReportListItem>({
      initialItems,
      initialHasMore,
      fetch: fetchReports,
      pageSize: REPORTS_PAGE_SIZE,
      deps: [statusFilter, searchFilter, fromFilter, toFilter],
    });

  const [executeRetry, isRetrying, resetRetrying] = useAsyncAction(retryReport);

  useEffect(() => {
    const activeRetryExpiration = retryExpirationRef.current;
    const nextExpiration = items.reduce<number | null>(
      (nearest, report) => {
        if (report.status !== 'GENERATING') return nearest;
        const expiresAt = report.generationStartedAt.getTime() + ORDER_REPORT_GENERATION_TIMEOUT_MS;
        if (expiresAt <= now) return nearest;

        return nearest === null ? expiresAt : Math.min(nearest, expiresAt);
      },
      activeRetryExpiration !== null && activeRetryExpiration > now ? activeRetryExpiration : null
    );
    if (nextExpiration === null) return;

    const timeout = setTimeout(
      () => {
        const currentNow = Date.now();
        setNow(currentNow);

        const currentRetryExpiration = retryExpirationRef.current;
        if (currentRetryExpiration !== null && currentRetryExpiration <= currentNow) {
          retryExpirationRef.current = null;
          retryAttemptIdRef.current += 1;
          setRetryingReportId(null);
          resetRetrying();
        }
      },
      Math.max(0, nextExpiration - Date.now())
    );

    return () => clearTimeout(timeout);
  }, [items, now, resetRetrying]);

  async function retryReport(reportId: string) {
    const retryAttemptId = ++retryAttemptIdRef.current;
    const generationStartedAt = new Date();
    updateItem(
      (report) => report.id === reportId,
      (report) => ({
        ...report,
        status: 'GENERATING',
        generationStartedAt,
        generatedAt: null,
      })
    );
    setNow(generationStartedAt.getTime());
    setRetryingReportId(reportId);
    retryExpirationRef.current = generationStartedAt.getTime() + ORDER_REPORT_GENERATION_TIMEOUT_MS;

    try {
      const { error } = await retryOrderReport(reportId);
      if (retryAttemptIdRef.current !== retryAttemptId) return;

      await reload();
      setNow(Date.now());
      if (error) throw new Error(error);
      toast.success('Отчёт сформирован');
    } finally {
      if (retryAttemptIdRef.current === retryAttemptId) {
        retryExpirationRef.current = null;
        setRetryingReportId(null);
      }
    }
  }

  function changeSearch(value: string) {
    setSearchFilter(value);
  }

  function changeStatus(value: OrderReportStatus | null) {
    setStatusFilter(value);
  }

  function changeFrom(value: string) {
    setFromFilter(value);
  }

  function changeTo(value: string) {
    setToFilter(value);
  }

  return (
    <ReportsListView
      items={items}
      hasMore={hasMore}
      isRefreshing={isRefreshing}
      isLoadingMore={isLoadingMore}
      now={now}
      statusFilter={statusFilter}
      searchFilter={searchFilter}
      fromFilter={fromFilter}
      toFilter={toFilter}
      retryingReportId={retryingReportId}
      isRetrying={isRetrying}
      onSearchChange={changeSearch}
      onStatusChange={changeStatus}
      onFromChange={changeFrom}
      onToChange={changeTo}
      onRetry={executeRetry}
      onLoadMore={loadMore}
    />
  );
}
