import type { DashboardPeriod } from '@/shared/types/dashboard';
import type { DashboardTooltipItem } from '../types';

export const DASHBOARD_PERIOD_OPTIONS: { value: DashboardPeriod; label: string }[] = [
  { value: '30d', label: '30 дней' },
  { value: '90d', label: '90 дней' },
  { value: '6m', label: '6 месяцев' },
  { value: '1y', label: 'Год' },
  { value: 'all', label: 'Всё время' },
  { value: 'custom', label: 'Свой период' },
];

export const BUSINESS_DYNAMICS_TOOLTIP_ITEMS: DashboardTooltipItem[] = [
  {
    dataKey: 'received',
    label: 'Оплачено',
    format: 'price',
    indicatorClassName: 'bg-chart-1',
  },
  {
    dataKey: 'orderValue',
    label: 'Заказы на сумму',
    format: 'price',
    indicatorClassName: 'bg-chart-2',
  },
  {
    dataKey: 'ordersCount',
    label: 'Новые заказы',
    format: 'number',
    indicatorClassName: 'bg-chart-3',
  },
  {
    dataKey: 'clientsCount',
    label: 'Новые клиенты',
    format: 'number',
    indicatorClassName: 'bg-chart-4',
  },
];

export const DASHBOARD_CHART_HELP = {
  businessDynamics:
    'Показывает за выбранный период полученные оплаты, сумму созданных неотменённых заказов, количество новых заказов и клиентов. Рубли — по левой шкале, количество — по правой.',
  statusPortfolio:
    'Показывает общую стоимость и количество заказов, созданных за выбранный период, в разбивке по их текущим статусам.',
  topClients:
    'Показывает до пяти клиентов с наибольшей суммой фактически полученных оплат за выбранный период.',
} as const;

export const STATUS_PORTFOLIO_TOOLTIP_ITEMS: DashboardTooltipItem[] = [
  {
    dataKey: 'orderValue',
    label: 'Заказы на сумму',
    format: 'price',
    indicatorClassName: 'bg-chart-1',
  },
  {
    dataKey: 'ordersCount',
    label: 'Количество заказов',
    format: 'number',
    indicatorClassName: 'bg-chart-2',
  },
];

export const TOP_CLIENTS_TOOLTIP_ITEMS: DashboardTooltipItem[] = [
  {
    dataKey: 'amount',
    label: 'Оплачено',
    format: 'price',
    indicatorClassName: 'bg-chart-1',
  },
];
