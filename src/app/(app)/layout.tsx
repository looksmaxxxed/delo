import { redirect } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { auth } from '@/config/auth';
import { db } from '@/config/db';
import { EmailVerificationProvider } from '@/shared/components/providers/email-verification/email-verification.provider';
import { AppSidebarServer } from '@/shared/components/layout/sidebar/sidebar-server';
import { BottomNavigation } from '@/shared/components/layout/bottom-navigation/bottom-navigation';
import { TopBar } from '@/shared/components/layout/top-bar';
import { INVALID_SESSION_ROUTE, LOGIN_ROUTE } from '@/constants/routes';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SEO_PRIVATE_ROBOTS } from '@/shared/constants/seo';

export const metadata: Metadata = { robots: SEO_PRIVATE_ROBOTS };

export default async function AppLayout(props: { children: ReactNode }) {
  const { children } = props;

  const session = await auth();
  if (!session) redirect(LOGIN_ROUTE);

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, image: true, emailVerified: true },
  });
  if (!user) redirect(INVALID_SESSION_ROUTE);

  return (
    <div className="flex h-dvh min-h-0 flex-none overflow-hidden p-3 sm:p-4">
      <AppSidebarServer />
      <div className="flex min-w-0 flex-1 flex-col gap-3 xl:gap-4 xl:pl-4">
        <TopBar userName={user.name} userImage={user.image} />
        <NuqsAdapter>
          <EmailVerificationProvider emailVerified={!!user.emailVerified}>
            <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pb-[calc(5.75rem+env(safe-area-inset-bottom))] xl:pb-0">
              {children}
            </main>
          </EmailVerificationProvider>
        </NuqsAdapter>
      </div>
      <BottomNavigation />
    </div>
  );
}
