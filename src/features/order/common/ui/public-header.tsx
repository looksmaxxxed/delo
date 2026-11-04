'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/shared/components/layout/theme-toggle';
import { Button } from '@/shared/components/ui/actions/button';
import { LockKeyholeIcon } from '@/shared/components/icons/lock-keyhole';
import { LOGIN_ROUTE } from '@/constants/routes';
import { BrandLogo } from '@/shared/components/layout/brand-logo';

export function PublicHeader() {
  return (
    <header className="surface-shadow border-border bg-background shrink-0 border-b">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <BrandLogo />
        </div>
        <div className="flex items-center gap-2">
          <Button
            render={<Link href={LOGIN_ROUTE} />}
            nativeButton={false}
            Icon={LockKeyholeIcon}
            mode="icon"
            variant="outline"
            tooltip="Войти"
            className="size-10 xl:size-11"
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
