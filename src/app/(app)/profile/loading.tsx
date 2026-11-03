import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { LoadingCard } from '@/shared/components/ui/feedback/loading-card';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

export default function ProfileLoading() {
  return (
    <AnimateIn className="flex flex-1 flex-col">
      <div className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]">
        <LoadingCard className="from-primary/10 via-card/60 to-card/60 bg-linear-to-br p-7">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Skeleton className="size-20 shrink-0 rounded-full" />
            <div className="space-y-3">
              <div className="flex gap-2">
                <Skeleton className="h-9 w-36 rounded-lg" />
                <Skeleton className="h-9 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-48 max-w-full" />
            </div>
          </div>

          <div className="border-border mt-7 border-t pt-7">
            <div className="space-y-5">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-44 w-full rounded-lg" />
              <div className="flex justify-end">
                <Skeleton className="h-9 w-48 rounded-lg" />
              </div>
            </div>
          </div>
        </LoadingCard>

        <LoadingCard className="self-start p-7">
          <div className="mb-4 flex items-center gap-2.5">
            <Skeleton className="size-7 rounded-lg" />
            <Skeleton className="h-6 w-52 max-w-full" />
          </div>
          <div className="grid gap-x-4 gap-y-6 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-5 w-44 max-w-full" />
              </div>
            ))}
            <div className="pt-1 lg:col-span-2">
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          </div>
        </LoadingCard>
      </div>
    </AnimateIn>
  );
}
