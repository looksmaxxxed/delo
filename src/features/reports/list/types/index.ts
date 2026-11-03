import type { OrderReportListItem } from '@/shared/types/reports';

export type ReportsListOptions = {
  initialItems: OrderReportListItem[];
  initialHasMore: boolean;
  initialNow: number;
};
