import { CircleCheck, LoaderCircle, TriangleAlert } from 'lucide-react';
import { Badge } from '@/shared/components/ui/data/badge';
import type { OrderReportListItem } from '@/shared/types/reports';
import { isOrderReportGenerationStale } from '@/shared/utils/reports';

type ReportStatusBadgeProps = {
  report: OrderReportListItem;
  now: number;
};

export function ReportStatusBadge(props: ReportStatusBadgeProps) {
  const { report, now } = props;
  const isStale = isOrderReportGenerationStale(report.status, report.generationStartedAt, now);

  if (isStale) {
    return (
      <Badge variant="destructive" size="sm">
        <TriangleAlert />
        Генерация прервана
      </Badge>
    );
  }

  if (report.status === 'GENERATING') {
    return (
      <Badge variant="secondary" size="sm">
        <LoaderCircle className="animate-spin" />
        Формируется
      </Badge>
    );
  }

  if (report.status === 'FAILED') {
    return (
      <Badge variant="destructive" size="sm">
        <TriangleAlert />
        Ошибка генерации
      </Badge>
    );
  }

  return (
    <Badge variant="accent" size="sm">
      <CircleCheck />
      Готов
    </Badge>
  );
}
