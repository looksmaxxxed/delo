import { BriefcaseBusiness, ClipboardList, HandCoins, WalletCards } from 'lucide-react';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import type { DashboardData, DashboardPeriod } from '@/shared/types/dashboard';
import { formatPrice } from '@/shared/utils/format';
import { cn } from '@/shared/utils/cn';
import { BusinessDynamicsChart } from './business-dynamics-chart';
import { DashboardEmptyState } from './dashboard-empty-state';
import { DeadlinesList } from './deadlines-list';
import { MetricCard } from './metric-card';
import { PeriodFilter } from './period-filter';
import { StatusPortfolioChart } from './status-portfolio-chart';
import { TopClientsChart } from './top-clients-chart';

type DashboardViewProps = {
  data: DashboardData;
  period: DashboardPeriod;
  from: string;
  to: string;
  isPending: boolean;
  onPeriodChange: (period: DashboardPeriod) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
};

export function DashboardView(props: DashboardViewProps) {
  const { data, period, from, to, isPending, onPeriodChange, onFromChange, onToChange } = props;
  const { metrics } = data;

  return (
    <AnimateIn className="page-stack flex-1">
      <div className="flex justify-end">
        <PeriodFilter
          period={period}
          from={from}
          to={to}
          isPending={isPending}
          onPeriodChange={onPeriodChange}
          onFromChange={onFromChange}
          onToChange={onToChange}
        />
      </div>

      <div
        className={cn(
          'space-y-6 transition-opacity duration-200 motion-reduce:transition-none',
          isPending && 'pointer-events-none opacity-55'
        )}
      >
        {!data.hasAnyData ? (
          <DashboardEmptyState />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              <MetricCard
                title="Оплачено"
                value={formatPrice(metrics.received)}
                description="к предыдущему периоду"
                Icon={WalletCards}
                changePercent={metrics.receivedChangePercent}
              />
              <MetricCard
                title="Заказы на сумму"
                value={formatPrice(metrics.orderValue)}
                description={`${metrics.ordersCount} заказов · средний чек ${formatPrice(metrics.averageOrderValue)}`}
                Icon={ClipboardList}
              />
              <MetricCard
                title="Активные заказы"
                value={`${metrics.activeOrders}`}
                description={`${metrics.inProgressOrders} непосредственно в работе`}
                Icon={BriefcaseBusiness}
              />
              <MetricCard
                title="К оплате"
                value={formatPrice(metrics.receivable)}
                description={`${metrics.receivableOrders} заказов ожидают оплаты`}
                Icon={HandCoins}
              />
            </div>

            <BusinessDynamicsChart data={data.series} />

            <div className="grid gap-6 xl:grid-cols-2">
              <StatusPortfolioChart data={data.statuses} />
              <TopClientsChart data={data.topClients} />
            </div>

            <DeadlinesList deadlines={data.deadlines} />
          </>
        )}
      </div>
    </AnimateIn>
  );
}
