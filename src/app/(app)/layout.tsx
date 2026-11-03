import { redirect } from 'next/navigation';
import { auth } from '@/config/auth';
import { db } from '@/config/db';
import { EmailVerificationProvider } from '@/shared/components/providers/email-verification/email-verification.provider';
import { AppSidebarServer } from '@/shared/components/layout/sidebar/sidebar-server';
import { TopBar } from '@/shared/components/layout/top-bar';
import { INVALID_SESSION_ROUTE, LOGIN_ROUTE } from '@/constants/routes';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SEO_PRIVATE_ROBOTS } from '@/shared/constants/seo';

export const metadata: Metadata = { robots: SEO_PRIVATE_ROBOTS };

export default async function DashboardLayout(props: { children: ReactNode }) {
  const { children } = props;

  const session = await auth();
  if (!session) redirect(LOGIN_ROUTE);

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, image: true, emailVerified: true },
  });
  if (!user) redirect(INVALID_SESSION_ROUTE);

  return (
    <EmailVerificationProvider emailVerified={!!user.emailVerified}>
      <div className="flex min-h-screen flex-1 overflow-hidden p-4">
        <AppSidebarServer />
        <div className="flex min-w-0 flex-1 flex-col gap-4 pl-4">
          <TopBar userName={user.name} userImage={user.image} />
          <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
        </div>
      </div>
    </EmailVerificationProvider>
  );
}
