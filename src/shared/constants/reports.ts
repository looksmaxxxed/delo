import type { OrderReportStatus } from '@prisma/client';
import type { SelectOption } from '@/shared/types/forms';

export const ORDER_REPORT_GENERATION_TIMEOUT_MS = 5 * 60 * 1000;

export const ORDER_REPORT_STATUS_LABELS: Record<OrderReportStatus, string> = {
  GENERATING: 'Формируется',
  READY: 'Готов',
  FAILED: 'Ошибка генерации',
};

export const ORDER_REPORT_STATUS_FILTER_OPTIONS: SelectOption[] = [
  { value: 'ALL', label: 'Все статусы' },
  ...Object.entries(ORDER_REPORT_STATUS_LABELS).map(([value, label]) => ({ value, label })),
];
