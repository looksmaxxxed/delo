import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';
import { PageHeaderSkeleton } from '@/shared/components/layout/page-header-skeleton';

export default function ClientLoading() {
  return (
    <div className="page-stack min-h-0 flex-1">
      <PageHeaderSkeleton />

      <AnimateIn className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, sectionIndex) => (
            <div key={sectionIndex} className="border-border bg-surface rounded-2xl border p-4">
              <div className="mb-4 flex items-center gap-2.5">
                <Skeleton className="size-7 rounded-lg" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        <div className="border-border bg-surface rounded-2xl border p-4">
          <div className="mb-4 flex items-center gap-2.5">
            <Skeleton className="size-7 rounded-lg" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>

        <div className="flex justify-end">
          <Skeleton className="h-9 w-44 rounded-lg" />
        </div>

        <div className="border-border bg-surface min-h-48 flex-1 rounded-2xl border p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-7 rounded-lg" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-6" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
