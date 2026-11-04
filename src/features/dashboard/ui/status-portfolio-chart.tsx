'use client';

import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts';
import { Layers3 } from 'lucide-react';
import { ChartContainer } from '@/shared/components/ui/data/chart';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import type { DashboardStatusPoint } from '@/shared/types/dashboard';
import { formatPrice } from '@/shared/utils/format';
import { DASHBOARD_CHART_HELP, STATUS_PORTFOLIO_TOOLTIP_ITEMS } from '../constants';
import { ChartHelpTooltip } from './chart-help-tooltip';
import { ChartEmptyState } from './chart-empty-state';
import { DashboardChartTooltip } from './dashboard-chart-tooltip';

type StatusPortfolioChartProps = {
  data: DashboardStatusPoint[];
};

export function StatusPortfolioChart(props: StatusPortfolioChartProps) {
  const { data } = props;
  const visibleData = data.filter((point) => point.ordersCount > 0);

  return (
    <SectionCard
      title="Заказы по статусам"
      Icon={Layers3}
      action={
        <ChartHelpTooltip
          chartTitle="Заказы по статусам"
          description={DASHBOARD_CHART_HELP.statusPortfolio}
        />
      }
      className="p-4 sm:p-6"
    >
      {visibleData.length === 0 ? (
        <ChartEmptyState />
      ) : (
        <ChartContainer className="aspect-auto h-64 w-full sm:h-72">
          <BarChart
            data={visibleData}
            layout="vertical"
            margin={{ top: 4, right: 12, bottom: 4, left: 8 }}
            accessibilityLayer={false}
          >
            <CartesianGrid horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickFormatter={formatPrice}
            />
            <YAxis
              type="category"
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={80}
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)', fillOpacity: 0.5 }}
              content={<DashboardChartTooltip items={STATUS_PORTFOLIO_TOOLTIP_ITEMS} />}
            />
            <Bar dataKey="orderValue" name="Сумма" radius={[0, 6, 6, 0]}>
              {visibleData.map((point) => (
                <Cell key={point.status} fill={point.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      )}
    </SectionCard>
  );
}
