import type { OrderStatus } from '@prisma/client';

export type DashboardPeriod = '30d' | '90d' | '6m' | '1y' | 'all' | 'custom';

export type DashboardGranularity = 'day' | 'week' | 'month';

export type DashboardQuery = {
  period?: string;
  from?: string;
  to?: string;
};

export type DashboardSeriesPoint = {
  key: string;
  label: string;
  tooltipLabel: string;
  received: number;
  orderValue: number;
  ordersCount: number;
  clientsCount: number;
};

export type DashboardStatusPoint = {
  status: OrderStatus;
  label: string;
  tooltipLabel: string;
  orderValue: number;
  ordersCount: number;
  color: string;
};

export type DashboardTopClient = {
  id: string;
  name: string;
  tooltipLabel: string;
  amount: number;
};

export type DashboardDeadline = {
  id: string;
  title: string;
  clientName: string;
  status: OrderStatus;
  price: number;
  deadline: Date;
  daysUntil: number;
};

export type DashboardData = {
  range: {
    period: DashboardPeriod;
    from: string;
    to: string;
    granularity: DashboardGranularity;
  };
  metrics: {
    received: number;
    receivedChangePercent: number | null;
    orderValue: number;
    ordersCount: number;
    averageOrderValue: number;
    activeOrders: number;
    inProgressOrders: number;
    receivable: number;
    receivableOrders: number;
  };
  series: DashboardSeriesPoint[];
  statuses: DashboardStatusPoint[];
  topClients: DashboardTopClient[];
  deadlines: DashboardDeadline[];
  hasAnyData: boolean;
};
