'use client';

import { BackLink } from '@/shared/components/ui/navigation/back-link';
import { useCurrentPage } from '@/shared/hooks/use-current-page';
import type { AnimatedIconComponent } from '@/types/icons';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  Icon?: AnimatedIconComponent;
  title?: string;
  description?: string;
  meta?: ReactNode;
  showIcon?: boolean;
  backLink?: {
    href: string;
    label: string;
  };
};

export function PageHeader(props: PageHeaderProps) {
  const { Icon: IconOverride, title, description, meta, showIcon = true, backLink } = props;

  const page = useCurrentPage();
  const Icon = IconOverride ?? page.Icon;
  const headerTitle = title ?? page.pageTitle ?? page.label;
  const headerDescription = description ?? page.description;

  return (
    <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-2 sm:gap-3">
      {backLink && <BackLink href={backLink.href} label={backLink.label} size="full" />}
      <div className="flex min-w-0 items-center gap-2 only:col-span-2 sm:items-start sm:gap-3">
        {showIcon && (
          <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-14">
            <Icon size={24} />
          </span>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">{headerTitle}</h1>
          {(meta || headerDescription) && (
            <div className="mt-1 flex min-w-0 items-center gap-2">
              {meta}
              {headerDescription && (
                <p className="text-muted-foreground hidden truncate text-sm sm:block">
                  {headerDescription}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
