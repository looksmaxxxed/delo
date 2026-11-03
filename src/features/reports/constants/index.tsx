import type { ColumnDef } from '@tanstack/react-table';
import { CalendarDays, FileClock, FileText, Tag, UserRound, Wrench } from 'lucide-react';
import { AnimatedLink } from '@/shared/components/ui/actions/animated-link';
import { RETURN_TO } from '@/shared/constants/navigation';
import type { OrderReportListItem } from '@/shared/types/reports';
import { formatDate } from '@/shared/utils/format';
import { ReportStatusBadge } from '../ui/report-status-badge';
import { ReportActions } from '../ui/report-actions';

type CreateReportsTableColumnsOptions = {
  now: number;
  retryingReportId: string | null;
  isRetrying: boolean;
  onRetry: (reportId: string) => void;
};

export function createReportsTableColumns(
  options: CreateReportsTableColumnsOptions
): ColumnDef<OrderReportListItem>[] {
  const { now, retryingReportId, isRetrying, onRetry } = options;

  return [
    {
      accessorKey: 'clientName',
      header: () => (
        <span className="inline-flex items-center gap-1.5">
          <UserRound className="size-3.5" />
          Клиент
        </span>
      ),
      size: 220,
      cell: ({ row }) => (
        <AnimatedLink
          href={`/clients/${row.original.clientId}?${RETURN_TO}=/reports`}
          className="max-w-full"
        >
          {row.original.clientName}
        </AnimatedLink>
      ),
    },
    {
      accessorKey: 'version',
      header: () => (
        <span className="inline-flex items-center gap-1.5">
          <FileClock className="size-3.5" />
          Версия
        </span>
      ),
      size: 110,
      cell: ({ getValue }) => <span className="font-medium">v{getValue<number>()}</span>,
      meta: { align: 'center' },
    },
    {
      accessorKey: 'orderTitle',
      header: () => (
        <span className="inline-flex items-center gap-1.5">
          <FileText className="size-3.5" />
          Заказ
        </span>
      ),
      size: 300,
      cell: ({ row }) => (
        <AnimatedLink
          href={`/orders/${row.original.orderId}?${RETURN_TO}=/reports`}
          className="max-w-full"
        >
          {row.original.orderTitle}
        </AnimatedLink>
      ),
    },
    {
      accessorKey: 'generationStartedAt',
      header: () => (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          Дата генерации
        </span>
      ),
      size: 190,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground tabular-nums">
          {formatDate(getValue<Date>(), 'd MMM yyyy, HH:mm')}
        </span>
      ),
      meta: { align: 'right' },
    },
    {
      accessorKey: 'status',
      header: () => (
        <span className="inline-flex items-center gap-1.5">
          <Tag className="size-3.5" />
          Статус
        </span>
      ),
      size: 190,
      cell: ({ row }) => <ReportStatusBadge report={row.original} now={now} />,
      meta: { align: 'right' },
    },
    {
      id: 'actions',
      header: () => (
        <span className="inline-flex items-center gap-1.5">
          <Wrench className="size-3.5" />
          Действия
        </span>
      ),
      size: 120,
      cell: ({ row }) => (
        <ReportActions
          report={row.original}
          now={now}
          isRetrying={isRetrying}
          retryingReportId={retryingReportId}
          onRetry={onRetry}
        />
      ),
      meta: { align: 'right' },
    },
  ];
}
