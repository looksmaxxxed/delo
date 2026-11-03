import { ORDER_REPORT_GENERATION_TIMEOUT_MS } from '@/shared/constants/reports';
import type { OrderReportStatus } from '@prisma/client';

export function getOrderReportStorageKey(input: {
  userId: string;
  orderId: string;
  reportId: string;
  version: number;
}) {
  const { userId, orderId, reportId, version } = input;

  return `orders/${userId}/${orderId}/reports/terms-v${version}-${reportId}.pdf`;
}

export function getOrderReportFileName(orderId: string, version: number) {
  return `order-${orderId}-terms-v${version}.pdf`;
}

export function isOrderReportGenerationStale(
  status: OrderReportStatus,
  generationStartedAt: Date,
  now: number
) {
  return (
    status === 'GENERATING' &&
    generationStartedAt.getTime() + ORDER_REPORT_GENERATION_TIMEOUT_MS <= now
  );
}
