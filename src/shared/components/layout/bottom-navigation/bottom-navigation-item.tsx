'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/shared/utils/cn';
import { startAnimatedIcon, stopAnimatedIcon } from '@/shared/utils/animation';
import type { AnimatedIconHandle } from '@/shared/types/icons';
import type { NavItem } from '@/shared/types/navigation';

type BottomNavigationItemProps = NavItem & { pathname: string };

export function BottomNavigationItem(props: BottomNavigationItemProps) {
  const { href, label, Icon, pathname } = props;
  const iconRef = useRef<AnimatedIconHandle>(null);
  const shouldReduceMotion = useReducedMotion();
  const isActive =
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  function handlePointerEnter() {
    startAnimatedIcon(iconRef);
  }

  function handlePointerLeave() {
    stopAnimatedIcon(iconRef);
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'focus-visible:ring-ring relative flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium leading-none outline-none transition-colors focus-visible:ring-2 motion-reduce:transition-none sm:text-xs',
        isActive
          ? 'text-primary font-semibold'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {isActive && (
        <motion.span
          layoutId="bottom-navigation-active"
          aria-hidden="true"
          className="bg-primary/10 absolute inset-0 rounded-xl"
          initial={false}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 420, damping: 36, mass: 0.75 }
          }
        />
      )}
      <span className="relative z-10">
        <Icon ref={iconRef} size={20} />
      </span>
      <span className="relative z-10 max-w-full truncate">{label}</span>
    </Link>
  );
}
