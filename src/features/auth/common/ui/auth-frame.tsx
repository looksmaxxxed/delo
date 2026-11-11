import type { ReactNode } from 'react';
import Link from 'next/link';
import { AuthDotMatrix } from '@/features/auth/common/ui/auth-dot-matrix';
import { ThemeToggle } from '@/shared/components/layout/theme-toggle';
import { ROOT_ROUTE } from '@/shared/constants/routes';
import { BrandLogo } from '@/shared/components/layout/brand-logo';

type AuthFrameProps = {
  children: ReactNode;
};

export function AuthFrame(props: AuthFrameProps) {
  const { children } = props;

  return (
    <main className="bg-surface text-foreground min-h-app-viewport relative isolate overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <AuthDotMatrix />
      </div>
      <section className="xl:px-18 min-h-app-viewport relative z-10 flex flex-col justify-center px-4 py-5 sm:px-10 sm:py-10 lg:w-[47%] lg:px-14 lg:py-12">
        <div className="glass border-glass border-primary/25 bg-linear-to-br from-primary/20 via-accent/15 to-card/75 mx-auto flex w-full max-w-[500px] flex-col rounded-3xl border px-5 py-6 sm:px-9 sm:py-9 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              href={ROOT_ROUTE}
              className="flex min-h-11 items-center gap-2.5"
              aria-label="Delo — главная"
            >
              <BrandLogo className="h-10" />
            </Link>
            <ThemeToggle />
          </div>

          <div className="w-full pb-1 pt-8 sm:pt-12">{children}</div>
        </div>
      </section>
    </main>
  );
}
