'use client';

import Link from 'next/link';
import { BrandLogo } from '@/shared/components/layout/brand-logo';
import { ThemeToggle } from '@/shared/components/layout/theme-toggle';
import { LOGIN_ROUTE, ROOT_ROUTE } from '@/shared/constants/routes';

export function LegalHeader() {
  return (
    <header className="bg-background/95 sticky top-0 z-30 backdrop-blur-lg">
      <div className="h-18 mx-auto flex w-full max-w-[1520px] items-center justify-between gap-3 px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link
          href={ROOT_ROUTE}
          aria-label="Delo — главная"
          className="focus-visible:outline-ring inline-flex min-h-11 shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <BrandLogo className="h-8 sm:h-9" />
        </Link>
        <nav aria-label="Основная навигация" className="flex items-center gap-3 sm:gap-6">
          <Link
            href={ROOT_ROUTE}
            className="landing-nav-link inline-flex min-h-11 items-center px-1"
          >
            Главная
          </Link>
          <Link
            href={LOGIN_ROUTE}
            className="landing-nav-link inline-flex min-h-11 items-center px-1"
          >
            Войти
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
