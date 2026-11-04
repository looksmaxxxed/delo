import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type DetailItemProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function DetailItem(props: DetailItemProps) {
  const { label, children, className } = props;
  return (
    <div className={cn('min-w-0', className)}>
      <dt className="text-muted-foreground text-xs font-bold">{label}</dt>
      <dd className="min-w-0 break-words font-medium">{children}</dd>
    </div>
  );
}
