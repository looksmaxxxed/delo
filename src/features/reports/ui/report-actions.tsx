'use client';

import { DownloadIcon } from '@/shared/components/icons/download';
import { RefreshCWIcon } from '@/shared/components/icons/refresh-cw';
import { Button } from '@/shared/components/ui/actions/button';
import { DownloadButton } from '@/shared/components/ui/actions/download-button';
import type { OrderReportListItem } from '@/shared/types/reports';
import { isOrderReportGenerationStale } from '@/shared/utils/reports';

type ReportActionsProps = {
  report: OrderReportListItem;
  now: number;
  retryingReportId: string | null;
  isRetrying: boolean;
  onRetry: (reportId: string) => void;
};

export function ReportActions(props: ReportActionsProps) {
  const { report, now, retryingReportId, isRetrying, onRetry } = props;
  const isStale = isOrderReportGenerationStale(report.status, report.generationStartedAt, now);
  const canRetry = report.status === 'FAILED' || isStale;

  function handleRetry() {
    onRetry(report.id);
  }

  if (report.status === 'READY') {
    return (
      <DownloadButton
        href={`/api/reports/${report.id}`}
        mode="icon"
        variant="ghost"
        tooltip="Скачать отчёт"
        Icon={DownloadIcon}
      />
    );
  }

  if (canRetry) {
    return (
      <Button
        type="button"
        mode="icon"
        variant="ghost"
        tooltip="Сформировать отчёт повторно"
        Icon={RefreshCWIcon}
        isLoading={isRetrying && retryingReportId === report.id}
        disabled={isRetrying}
        onClick={handleRetry}
      />
    );
  }

  return (
    <Button
      type="button"
      mode="icon"
      variant="ghost"
      tooltip="Отчёт формируется"
      isLoading
      disabled
    />
  );
}
