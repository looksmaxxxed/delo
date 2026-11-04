import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SEO_PRIVATE_ROBOTS } from '@/shared/constants/seo';
import { PublicHeader } from '@/features/order/common/ui/public-header';

export const metadata: Metadata = { robots: SEO_PRIVATE_ROBOTS };

export default function PublicOrderLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
