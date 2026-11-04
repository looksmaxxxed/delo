'use client';

import { usePathname } from 'next/navigation';
import { LayoutGroup } from 'motion/react';
import { NAV_ITEMS } from '@/shared/constants/navigation';
import { BottomNavigationItem } from './bottom-navigation-item';

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <LayoutGroup id="app-bottom-navigation">
      <nav
        aria-label="Основная навигация"
        className="surface-shadow border-sidebar-border bg-surface/95 fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 grid grid-cols-5 gap-1 rounded-2xl border p-1.5 backdrop-blur-xl xl:hidden"
      >
        {Object.values(NAV_ITEMS)
          .filter((item) => !item.isDisabled)
          .map((item) => (
            <BottomNavigationItem key={item.href} {...item} pathname={pathname} />
          ))}
      </nav>
    </LayoutGroup>
  );
}
