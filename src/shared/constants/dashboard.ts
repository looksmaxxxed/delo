import { OrderStatus } from '@prisma/client';
import type { DashboardPeriod } from '@/shared/types/dashboard';

export const DASHBOARD_TIME_ZONE = 'Europe/Moscow';
export const DASHBOARD_TIME_ZONE_OFFSET_MS = 3 * 60 * 60 * 1000;

export const DASHBOARD_DEFAULT_PERIOD: DashboardPeriod = '30d';
export const DASHBOARD_PERIOD_VALUES: readonly DashboardPeriod[] = [
  '30d',
  '90d',
  '6m',
  '1y',
  'all',
  'custom',
];

export const DASHBOARD_ACTIVE_ORDER_STATUSES = [
  OrderStatus.SENT,
  OrderStatus.CONFIRMED,
  OrderStatus.IN_PROGRESS,
] as const;

export const DASHBOARD_RECEIVABLE_ORDER_STATUSES = [
  OrderStatus.CONFIRMED,
  OrderStatus.IN_PROGRESS,
  OrderStatus.COMPLETED,
] as const;

export const DASHBOARD_DEADLINE_ORDER_STATUSES = [
  OrderStatus.CONFIRMED,
  OrderStatus.IN_PROGRESS,
] as const;

export const DASHBOARD_STATUS_COLORS: Record<OrderStatus, string> = {
  DRAFT: 'var(--chart-4)',
  SENT: 'var(--chart-2)',
  CONFIRMED: 'var(--chart-3)',
  IN_PROGRESS: 'var(--chart-1)',
  COMPLETED: 'var(--chart-5)',
  CANCELLED: 'var(--destructive)',
};
