'use client';

import { useCallback } from 'react';
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

export function AppSidebar(props: AppSidebarProps) {
  const { defaultCollapsed } = props;
  const [collapsed, setCollapsed] = useCookieStorage(SIDEBAR_COOKIE_KEY, defaultCollapsed);
  const pathname = usePathname();

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 220 }}
      className="relative hidden shrink-0 flex-col gap-4 transition-colors xl:flex"
      initial={false}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <div
        className={cn(
          'surface-shadow bg-surface border-sidebar-border min-h-20.5 relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 sm:px-5',
          collapsed && 'justify-center'
        )}
      >
        <BrandLogo compact={collapsed} />
      </div>

      <nav className="surface-shadow bg-surface border-sidebar-border flex flex-1 flex-col gap-1 rounded-2xl border py-3">
        {Object.values(NAV_ITEMS)
          .filter((item) => !item.isDisabled)
          .map((item) => (
            <SidebarNavItem key={item.href} {...item} collapsed={collapsed} pathname={pathname} />
          ))}
      </nav>

      <div className="surface-shadow bg-surface border-sidebar-border rounded-2xl border p-2">
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
