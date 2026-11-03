import { PageHeaderSkeleton } from '@/shared/components/layout/page-header-skeleton';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { LoadingCard } from '@/shared/components/ui/feedback/loading-card';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

export default function EditOrderLoading() {
  return (
    <AnimateIn className="page-stack flex-1">
      <PageHeaderSkeleton />

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <LoadingCard>
            <div className="mb-5 flex items-center gap-3">
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </LoadingCard>

          <LoadingCard>
            <div className="mb-5 flex items-center gap-3">
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-12 w-full rounded-lg" />
          </LoadingCard>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <LoadingCard>
            <div className="mb-5 flex items-center gap-3">
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </LoadingCard>

          <LoadingCard>
            <div className="mb-5 flex items-center gap-3">
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-12 w-full rounded-lg" />
          </LoadingCard>
        </div>

        <LoadingCard>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="h-5 w-28" />
            </div>
            <Skeleton className="size-9 rounded-lg" />
          </div>
          <Skeleton className="mb-3 h-3 w-16" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div className="border-border mt-3 flex justify-end border-t pt-3">
            <Skeleton className="h-5 w-28" />
          </div>
        </LoadingCard>

        <div className="flex justify-end pt-1">
          <Skeleton className="h-10 w-48 rounded-lg" />
        </div>
      </div>
    </AnimateIn>
  );
}
