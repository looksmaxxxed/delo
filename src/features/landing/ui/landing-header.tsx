'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from '@/shared/components/ui/actions/button';
import { ThemeToggle } from '@/shared/components/layout/theme-toggle';
import { LANDING_NAV_ITEMS } from '@/features/landing/constants';
import { BrandLogo } from '@/shared/components/layout/brand-logo';
import { cn } from '@/shared/utils/cn';

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleToggleMenu() {
    setMenuOpen((open) => !open);
  }

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="bg-background/95 relative sticky top-0 z-30 backdrop-blur-lg">
      <div className="h-18 relative mx-auto flex w-full max-w-[1520px] items-center justify-between gap-3 px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link
          href="/"
          aria-label="Delo — главная"
          className="focus-visible:outline-ring flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <BrandLogo className="h-9" />
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 xl:flex"
          aria-label="Навигация по лендингу"
        >
          {LANDING_NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="landing-nav-link inline-flex min-h-11 items-center"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-6">
          <ThemeToggle />
          <Link
            href="/login"
            className="landing-nav-link hidden min-h-11 items-center px-1 sm:inline-flex"
          >
            Войти
          </Link>
          <Button
            render={<Link href="/register" />}
            nativeButton={false}
            className="hidden h-10 rounded-lg px-3 text-sm motion-reduce:transform-none sm:inline-flex xl:h-11 xl:px-5"
          >
            Создать аккаунт
          </Button>
          <Button
            variant="outline"
            mode="icon"
            tooltip={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="size-10 motion-reduce:transform-none xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="landing-mobile-nav"
            onClick={handleToggleMenu}
          >
            <span aria-hidden="true" className="relative block size-5">
              <span
                className={cn(
                  'bg-foreground absolute left-0 h-0.5 w-5 rounded-full transition-[top,translate,rotate] duration-300 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none',
                  menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0.5'
                )}
              />
              <span
                className={cn(
                  'bg-foreground absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full transition-[opacity,scale] duration-200 motion-reduce:transition-none',
                  menuOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
                )}
              />
              <span
                className={cn(
                  'bg-foreground absolute left-0 h-0.5 w-5 rounded-full transition-[top,translate,rotate] duration-300 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none',
                  menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-4'
                )}
              />
            </span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="landing-mobile-nav"
            aria-label="Мобильная навигация"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="surface-shadow border-border bg-surface absolute inset-x-3 top-full flex origin-top flex-col gap-1 rounded-2xl border p-4 sm:inset-x-6 xl:hidden"
          >
            {LANDING_NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleCloseMenu}
                className="landing-nav-link rounded-lg px-3 py-3"
              >
                {item.label}
              </a>
            ))}
            <div className="border-border mt-2 flex items-center justify-between gap-3 border-t pt-4">
              <Link
                href="/login"
                className="landing-nav-link rounded-lg px-3 py-3"
                onClick={handleCloseMenu}
              >
                Войти
              </Link>
              <Button
                render={<Link href="/register" />}
                nativeButton={false}
                className="h-10 px-3 text-sm xl:h-11 xl:px-5"
              >
                Создать аккаунт
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
