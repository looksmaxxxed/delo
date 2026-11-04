'use client';

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartNoAxesCombined } from 'lucide-react';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { ChartContainer } from '@/shared/components/ui/data/chart';
import type { DashboardSeriesPoint } from '@/shared/types/dashboard';
import { formatPrice } from '@/shared/utils/format';
import { BUSINESS_DYNAMICS_TOOLTIP_ITEMS, DASHBOARD_CHART_HELP } from '../constants';
import { AnimatedLineCurve } from './animated-line-curve';
import { ChartHelpTooltip } from './chart-help-tooltip';
import { DashboardChartTooltip } from './dashboard-chart-tooltip';
import { ChartEmptyState } from './chart-empty-state';

type BusinessDynamicsChartProps = {
  data: DashboardSeriesPoint[];
};

export function BusinessDynamicsChart(props: BusinessDynamicsChartProps) {
  const { data } = props;
  const hasData = data.some(
    (point) =>
      point.received > 0 || point.orderValue > 0 || point.ordersCount > 0 || point.clientsCount > 0
  );
  const chartKey = `${data[0]?.key}-${data[data.length - 1]?.key}-${data.length}`;

  return (
    <SectionCard
      title="Динамика бизнеса"
      Icon={ChartNoAxesCombined}
      action={
        <ChartHelpTooltip
          chartTitle="Динамика бизнеса"
          description={DASHBOARD_CHART_HELP.businessDynamics}
        />
      }
      className="p-4 sm:p-6"
    >
      <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-xs">
        <span className="text-muted-foreground inline-flex items-center gap-2">
          <span className="bg-chart-1 h-0.5 w-4 rounded-full" /> Оплачено
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-2">
          <span className="bg-chart-2 h-0.5 w-4 rounded-full" /> Заказы на сумму
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-2">
          <span className="bg-chart-3 h-0.5 w-4 rounded-full" /> Новые заказы
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-2">
          <span className="bg-chart-4 h-0.5 w-4 rounded-full" /> Новые клиенты
        </span>
      </div>

      {!hasData ? (
        <ChartEmptyState />
      ) : (
        <ChartContainer className="aspect-auto h-64 w-full sm:h-80">
          <LineChart
            key={chartKey}
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 8 }}
            accessibilityLayer={false}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              minTickGap={24}
            />
            <YAxis
              yAxisId="money"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width="auto"
              tickFormatter={formatPrice}
            />
            <YAxis
              yAxisId="activity"
              orientation="right"
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width="auto"
              tickFormatter={String}
            />
            <Tooltip
              cursor={{ stroke: 'var(--border)', strokeDasharray: '4 4' }}
              content={<DashboardChartTooltip items={BUSINESS_DYNAMICS_TOOLTIP_ITEMS} />}
            />
            <Line
              yAxisId="money"
              type="monotone"
              dataKey="received"
              name="Оплачено"
              stroke="var(--chart-1)"
              strokeWidth={2.5}
              dot={false}
              shape={<AnimatedLineCurve />}
              isAnimationActive={false}
            />
            <Line
              yAxisId="money"
              type="monotone"
              dataKey="orderValue"
              name="Заказы на сумму"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
              shape={<AnimatedLineCurve />}
              isAnimationActive={false}
            />
            <Line
              yAxisId="activity"
              type="monotone"
              dataKey="ordersCount"
              name="Новые заказы"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={false}
              shape={<AnimatedLineCurve />}
              isAnimationActive={false}
            />
            <Line
              yAxisId="activity"
              type="monotone"
              dataKey="clientsCount"
              name="Новые клиенты"
              stroke="var(--chart-4)"
              strokeWidth={2}
              dot={false}
              shape={<AnimatedLineCurve />}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      )}
    </SectionCard>
  );
}
