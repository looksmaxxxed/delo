import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { LoadingCard } from '@/shared/components/ui/feedback/loading-card';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';
import { PageHeaderSkeleton } from '@/shared/components/layout/page-header-skeleton';

export default function OrderLoading() {
  return (
    <div className="page-stack flex-1">
      <PageHeaderSkeleton />

      <AnimateIn className="space-y-6">
        <div className="border-border flex flex-wrap items-center justify-between gap-4 border-b pb-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-28 w-full rounded-xl sm:w-56" />
            <Skeleton className="h-28 w-full rounded-xl sm:w-80" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-7 w-36 rounded-lg" />
            <Skeleton className="h-7 w-28 rounded-lg" />
          </div>
        </div>

        <section>
          <Skeleton className="h-5 w-36" />
          <Skeleton className="mt-2 h-3 w-20" />
          <div className="mt-3 flex flex-wrap gap-4">
            <Skeleton className="h-18.75 sm:w-50 w-full rounded-xl" />
            <Skeleton className="h-18.75 w-full rounded-xl sm:w-60" />
          </div>
        </section>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <LoadingCard className="h-88 overflow-hidden">
            <Skeleton className="mb-5 h-5 w-28" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-6">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-36" />
                </div>
              ))}
            </div>
          </LoadingCard>

          <LoadingCard className="h-88 overflow-hidden">
            <div className="mb-5 flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
            <div className="space-y-5">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="ml-auto h-3 w-20" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
              <div className="border-border border-t">
                <div className="border-border flex justify-between gap-4 border-b py-4">
                  <Skeleton className="h-3 w-20" />
                  <div className="flex gap-8">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
                <div className="space-y-3 pt-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </LoadingCard>

          <LoadingCard className="h-80 overflow-hidden">
            <Skeleton className="mb-4 h-5 w-28" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-6">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </LoadingCard>

          <LoadingCard className="h-80 overflow-hidden">
            <Skeleton className="mb-5 h-5 w-20" />
            <div className="border-border mb-2 flex justify-between border-b pb-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-10" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-4 shrink-0 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <Skeleton className="h-3 w-28" />
                </div>
              ))}
            </div>
          </LoadingCard>
        </div>
      </AnimateIn>
    </div>
  );
}
