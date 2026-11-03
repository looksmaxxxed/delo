'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/shared/components/layout/theme-toggle';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { Button } from '@/shared/components/ui/actions/button';
import { PageHeader } from '@/shared/components/layout/page-header';
import { LogoutIcon } from '@/shared/components/icons/logout';
import { logoutUser } from '@/actions/auth';
import { getInitials, getProfileImageUrl } from '@/shared/utils/profile';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '@/constants/routes';

type TopBarProps = {
  userName: string;
  userImage: string | null;
};

export function TopBar(props: TopBarProps) {
  const { userName, userImage } = props;
  const router = useRouter();
  const initials = getInitials(userName);
  const userImageUrl = getProfileImageUrl(userImage);

  async function handleLogout() {
    await logoutUser();
    router.push(LOGIN_ROUTE);
    router.refresh();
  }

  const [executeLogout, isLoggingOut] = useAsyncAction(handleLogout);

  return (
    <header className="surface-shadow bg-surface border-sidebar-border relative flex min-h-16 shrink-0 flex-col items-stretch justify-between gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
      <PageHeader />
      <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
        <ThemeToggle />
        <Link
          href={PROFILE_ROUTE}
          className="hover:bg-muted flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
        >
          <div className="hidden flex-col items-end leading-none sm:flex">
            <span className="text-foreground text-sm font-semibold">{userName}</span>
          </div>
          <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold">
            {userImageUrl ? (
              <Image
                src={userImageUrl}
                alt={userName}
                width={40}
                height={40}
                unoptimized
                className="size-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
        </Link>
        <Button
          Icon={LogoutIcon}
          mode="icon"
          variant="outline"
          tooltip="Выйти"
          isLoading={isLoggingOut}
          onClick={executeLogout}
        />
      </div>
    </header>
  );
}
