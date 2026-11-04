import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type MetricCardProps = {
  title: string;
  value: string;
  description: ReactNode;
  Icon: ComponentType<{ size?: number; className?: string }>;
  changePercent?: number | null;
};

export function MetricCard(props: MetricCardProps) {
  const { title, value, description, Icon, changePercent } = props;
  const hasComparison = typeof changePercent === 'number';
  const TrendIcon = !hasComparison
    ? null
    : changePercent > 0
      ? TrendingUp
      : changePercent < 0
        ? TrendingDown
        : Minus;

  return (
    <div className="surface-shadow border-border bg-surface relative overflow-hidden rounded-2xl border p-4 sm:p-5">
      <div className="bg-primary/8 absolute -right-10 -top-10 size-28 rounded-full blur-2xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
            {title}
          </p>
          <p className="mt-3 text-2xl font-bold tabular-nums tracking-tight">{value}</p>
        </div>
        <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
          <Icon size={19} />
        </span>
      </div>
      <div className="relative mt-3 flex min-h-5 flex-wrap items-center gap-2 text-xs">
        {hasComparison && TrendIcon && (
          <span
            className={cn(
              'inline-flex items-center gap-1 font-semibold tabular-nums',
              changePercent > 0 && 'text-primary',
              changePercent < 0 && 'text-destructive',
              changePercent === 0 && 'text-muted-foreground'
            )}
          >
            <TrendIcon size={13} />
            {changePercent > 0 ? '+' : ''}
            {changePercent}%
          </span>
        )}
        <span className="text-muted-foreground">
          {changePercent === null ? 'нет данных для сравнения' : description}
        </span>
      </div>
    </div>
  );
}
