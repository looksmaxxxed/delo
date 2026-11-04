import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { LoadingCard } from '@/shared/components/ui/feedback/loading-card';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

export default function DashboardLoading() {
  return (
    <AnimateIn className="page-stack flex-1">
      <div className="flex justify-end">
        <Skeleton className="xl:w-130 h-11 w-full rounded-xl" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingCard key={index} className="h-36 p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
              <Skeleton className="size-10 rounded-xl" />
            </div>
            <Skeleton className="mt-4 h-3 w-44" />
          </LoadingCard>
        ))}
      </div>

      <LoadingCard className="h-104 sm:h-132 p-4 sm:p-6">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="mt-8 h-72 w-full rounded-xl sm:h-96" />
      </LoadingCard>

      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <LoadingCard key={index} className="sm:h-88 h-80 p-4 sm:p-6">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="mt-8 h-56 w-full rounded-xl sm:h-64" />
          </LoadingCard>
        ))}
      </div>
    </AnimateIn>
  );
}
