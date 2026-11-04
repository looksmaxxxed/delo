import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type OrderStatusPanelCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function OrderStatusPanelCard(props: OrderStatusPanelCardProps) {
  const { title, children, className, contentClassName } = props;

  return (
    <div className={cn('border-border bg-surface/30 w-full rounded-xl border p-3', className)}>
      <p className="text-muted-foreground text-sm font-medium">{title}</p>
      <div className={cn('mt-3', contentClassName)}>{children}</div>
    </div>
  );
}
