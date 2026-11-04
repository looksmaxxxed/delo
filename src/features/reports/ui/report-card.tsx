import { CalendarDays, FileClock } from 'lucide-react';
import { AnimatedLink } from '@/shared/components/ui/actions/animated-link';
import { DetailItem } from '@/shared/components/ui/data/detail-item';
import { RETURN_TO } from '@/shared/constants/navigation';
import type { OrderReportListItem } from '@/shared/types/reports';
import { formatDate } from '@/shared/utils/format';
import { ReportActions } from './report-actions';
import { ReportStatusBadge } from './report-status-badge';

type ReportCardProps = {
  report: OrderReportListItem;
  now: number;
  retryingReportId: string | null;
  isRetrying: boolean;
  onRetry: (reportId: string) => void;
};

export function ReportCard(props: ReportCardProps) {
  const { report, now, retryingReportId, isRetrying, onRetry } = props;

  return (
    <article className="surface-shadow border-sidebar-border bg-surface h-full rounded-2xl border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            <FileClock className="size-3.5" />
            Версия {report.version}
          </p>
          <AnimatedLink
            href={`/orders/${report.orderId}?${RETURN_TO}=/reports`}
            className="mt-1.5 max-w-full text-base"
          >
            {report.orderTitle}
          </AnimatedLink>
        </div>
        <div className="shrink-0 [&_[data-slot=button]]:size-10">
          <ReportActions
            report={report}
            now={now}
            retryingReportId={retryingReportId}
            isRetrying={isRetrying}
            onRetry={onRetry}
          />
        </div>
      </div>

      <div className="mt-4">
        <ReportStatusBadge report={report} now={now} />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm [&_dd]:mt-1">
        <DetailItem label="Клиент">
          <AnimatedLink
            href={`/clients/${report.clientId}?${RETURN_TO}=/reports`}
            className="max-w-full"
          >
            {report.clientName}
          </AnimatedLink>
        </DetailItem>
        <DetailItem label="Сформирован" className="text-right">
          <span className="inline-flex items-center justify-end gap-1.5">
            <CalendarDays className="text-muted-foreground size-3.5" />
            {formatDate(report.generationStartedAt, 'd MMM yyyy, HH:mm')}
          </span>
        </DetailItem>
      </dl>
    </article>
  );
}
