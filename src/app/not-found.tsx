import type { Metadata } from 'next';
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { HomeIcon } from '@/shared/components/icons/home';
import { PublicHeader } from '@/features/order/common/ui/public-header';
import { Button } from '@/shared/components/ui/actions/button';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';

export const metadata: Metadata = {
  title: 'Страница не найдена | Delo',
};

export default function NotFound() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-12 sm:px-6 sm:py-20">
        <AnimateIn variant="zoom" className="w-full">
          <section className="surface-shadow border-border bg-secondary/30 dark:bg-surface relative isolate overflow-hidden rounded-3xl border p-5 sm:p-10 lg:p-14">
            <span className="text-primary/5 pointer-events-none absolute -bottom-16 -right-4 -z-10 text-[12rem] font-black leading-none sm:text-[18rem]">
              404
            </span>

            <div className="grid items-center gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12">
              <div className="border-primary/20 bg-primary/10 text-primary flex size-28 items-center justify-center rounded-3xl border sm:size-36">
                <FileQuestion className="size-12 sm:size-16" strokeWidth={1.5} />
              </div>

              <div className="max-w-2xl">
                <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-5xl">
                  Страница не найдена
                </h1>
                <p className="text-muted-foreground mt-4 max-w-xl text-base leading-7 sm:text-lg">
                  Проверьте адрес или вернитесь на главную. Возможно, ссылка устарела или была
                  скопирована не полностью.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                render={<Link href="/" />}
                nativeButton={false}
                Icon={HomeIcon}
                className="h-10 xl:h-11"
              >
                На главную
              </Button>
            </div>
          </section>
        </AnimateIn>
      </main>
    </>
  );
}
