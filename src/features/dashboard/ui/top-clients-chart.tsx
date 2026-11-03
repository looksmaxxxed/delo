'use client';

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { Users } from 'lucide-react';
import { ChartContainer } from '@/shared/components/ui/data/chart';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import type { DashboardTopClient } from '@/shared/types/dashboard';
import { formatPrice } from '@/shared/utils/format';
import { DASHBOARD_CHART_HELP, TOP_CLIENTS_TOOLTIP_ITEMS } from '../constants';
import { formatClientAxisLabel } from '../utils';
import { ChartHelpTooltip } from './chart-help-tooltip';
import { ChartEmptyState } from './chart-empty-state';
import { DashboardChartTooltip } from './dashboard-chart-tooltip';

type TopClientsChartProps = {
  data: DashboardTopClient[];
};

export function TopClientsChart(props: TopClientsChartProps) {
  const { data } = props;

  return (
    <SectionCard
      title="Лучшие клиенты"
      Icon={Users}
      action={
        <ChartHelpTooltip
          chartTitle="Лучшие клиенты"
          description={DASHBOARD_CHART_HELP.topClients}
        />
      }
      className="p-4 sm:p-6"
    >
      {data.length === 0 ? (
        <ChartEmptyState />
      ) : (
        <ChartContainer className="aspect-auto h-72 w-full">
          <BarChart
            data={data}
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
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickFormatter={formatClientAxisLabel}
              width={108}
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)', fillOpacity: 0.5 }}
              content={<DashboardChartTooltip items={TOP_CLIENTS_TOOLTIP_ITEMS} />}
            />
            <Bar dataKey="amount" name="Оплачено" fill="var(--chart-1)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ChartContainer>
      )}
    </SectionCard>
  );
}
