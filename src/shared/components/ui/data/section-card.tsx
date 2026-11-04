import type { ComponentProps, ComponentType, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type SectionCardProps = ComponentProps<'div'> & {
  title: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  action?: ReactNode;
  variant?: 'default' | 'mobile-flat';
  titleClassName?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
  truncateTitle?: boolean;
  children: ReactNode;
};

export function SectionCard(props: SectionCardProps) {
  const {
    title,
    Icon,
    action,
    variant = 'default',
    titleClassName,
    titleAs: Title = 'h3',
    truncateTitle = true,
    children,
    className,
    ...rest
  } = props;

  return (
    <div
      className={cn(
        variant === 'default'
          ? 'surface-shadow border-border bg-secondary/30 dark:bg-surface rounded-2xl border p-4'
          : 'border-border sm:bg-secondary/30 sm:dark:bg-surface rounded-none border-x-0 border-t-0 bg-transparent px-0 pb-3 pt-0 shadow-none sm:rounded-2xl sm:border sm:p-4 sm:[box-shadow:var(--surface-shadow)]',
        className
      )}
      {...rest}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-3',
          variant === 'mobile-flat' ? 'mb-2 sm:mb-4' : 'mb-4'
        )}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="bg-muted text-primary flex size-7 shrink-0 items-center justify-center rounded-lg">
            <Icon size={15} />
          </div>
          <Title
            className={cn('text-sm font-semibold', truncateTitle && 'truncate', titleClassName)}
          >
            {title}
          </Title>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
