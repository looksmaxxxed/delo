'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useRef, type ComponentProps, type MouseEvent } from 'react';
import { ArrowUpRightIcon } from '@/shared/components/icons/arrow-up-right';
import type { AnimatedIconHandle } from '@/shared/types/icons';
import { startAnimatedIcon, stopAnimatedIcon } from '@/shared/utils/animation';
import { cn } from '@/shared/utils/cn';

type AnimatedLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  stopPropagation?: boolean;
};

export function AnimatedLink(props: AnimatedLinkProps) {
  const {
    children,
    className,
    href,
    stopPropagation = false,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...rest
  } = props;
  const iconRef = useRef<AnimatedIconHandle | null>(null);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (stopPropagation) event.stopPropagation();
    onClick?.(event);
  }

  function handleMouseEnter(event: MouseEvent<HTMLAnchorElement>) {
    startAnimatedIcon(iconRef);
    onMouseEnter?.(event);
  }

  function handleMouseLeave(event: MouseEvent<HTMLAnchorElement>) {
    stopAnimatedIcon(iconRef);
    onMouseLeave?.(event);
  }

  return (
    <Link
      {...rest}
      href={href as Route<string>}
      className={cn(
        'text-foreground focus-visible:outline-ring inline-flex min-w-0 items-center gap-1 font-medium underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2',
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="truncate">{children}</span>
      <ArrowUpRightIcon ref={iconRef} size={14} className="shrink-0" aria-hidden />
    </Link>
  );
}
