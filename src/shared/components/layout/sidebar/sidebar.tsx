'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { PanelLeftCloseIcon } from '@/shared/components/icons/panel-left-close';
import { PanelLeftOpenIcon } from '@/shared/components/icons/panel-left-open';
import { Button } from '@/shared/components/ui/actions/button';
import { useCookieStorage } from '@/shared/hooks/use-cookie-storage';
import { NAV_ITEMS } from '@/constants/navigation';
import { SIDEBAR_COOKIE_KEY } from '@/shared/constants/storage';
import { SidebarNavItem } from './sidebar-item';
import { cn } from '@/shared/utils/cn';
import { BrandLogo } from '@/shared/components/layout/brand-logo';

type AppSidebarProps = {
  defaultCollapsed: boolean;
};

const MOBILE_SIDEBAR_QUERY = '(max-width: 639px)';

function subscribeToMobileSidebar(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(MOBILE_SIDEBAR_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);

  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getMobileSidebarSnapshot() {
  return window.matchMedia(MOBILE_SIDEBAR_QUERY).matches;
}

function getServerMobileSidebarSnapshot() {
  return false;
}

export function AppSidebar(props: AppSidebarProps) {
  const { defaultCollapsed } = props;
  const [collapsed, setCollapsed] = useCookieStorage(SIDEBAR_COOKIE_KEY, defaultCollapsed);
  const isMobile = useSyncExternalStore(
    subscribeToMobileSidebar,
    getMobileSidebarSnapshot,
    getServerMobileSidebarSnapshot
  );
  const isCollapsed = collapsed || isMobile;
  const pathname = usePathname();

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 72 : 220 }}
      className="max-sm:w-18! relative flex shrink-0 flex-col gap-4 transition-colors"
      initial={false}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <div
        className={cn(
          'surface-shadow bg-surface border-sidebar-border min-h-20.5 relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 sm:px-5',
          isCollapsed && 'justify-center'
        )}
      >
        <BrandLogo compact={isCollapsed} />
      </div>

      <nav className="surface-shadow bg-surface border-sidebar-border flex flex-1 flex-col gap-1 rounded-2xl border py-3">
        {Object.values(NAV_ITEMS)
          .filter((item) => !item.isDisabled)
          .map((item) => (
            <SidebarNavItem key={item.href} {...item} collapsed={isCollapsed} pathname={pathname} />
          ))}
      </nav>

      <div className="surface-shadow bg-surface border-sidebar-border rounded-2xl border p-2 max-sm:hidden">
        <Button
          Icon={collapsed ? PanelLeftOpenIcon : PanelLeftCloseIcon}
          className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-11 w-full rounded-xl border-none bg-transparent"
          onClick={toggle}
          mode="icon"
          tooltip={collapsed ? 'Развернуть' : 'Свернуть'}
          variant="outline"
        />
      </div>
    </motion.aside>
  );
}
