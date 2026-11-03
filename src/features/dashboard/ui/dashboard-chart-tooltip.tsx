import type { TooltipContentProps } from 'recharts';
import { cn } from '@/shared/utils/cn';
import { formatPrice } from '@/shared/utils/format';
import type { DashboardTooltipItem } from '../types';

type DashboardChartTooltipProps = {
  active?: boolean;
  payload?: TooltipContentProps<number, string>['payload'];
  items: DashboardTooltipItem[];
};

export function DashboardChartTooltip(props: DashboardChartTooltipProps) {
  const { active, payload, items } = props;
  const source = payload?.[0]?.payload;
  if (!active || !source || typeof source !== 'object') return null;

  const tooltipLabel =
    'tooltipLabel' in source && typeof source.tooltipLabel === 'string'
      ? source.tooltipLabel
      : null;

  return (
    <div className="border-border bg-popover text-popover-foreground min-w-48 rounded-lg border px-3 py-2.5 text-xs shadow-xl">
      {tooltipLabel && <p className="mb-2 font-semibold">{tooltipLabel}</p>}
      <div className="space-y-1.5">
        {items.map((item) => {
          const value = item.dataKey in source ? source[item.dataKey] : null;
          if (typeof value !== 'number') return null;

          return (
            <div key={item.dataKey} className="flex items-center gap-2">
              <span className={cn('size-2 shrink-0 rounded-sm', item.indicatorClassName)} />
              <span className="text-muted-foreground flex-1">{item.label}</span>
              <span className="font-medium tabular-nums">
                {item.format === 'price' ? formatPrice(value) : value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
