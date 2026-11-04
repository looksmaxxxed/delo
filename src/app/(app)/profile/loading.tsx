import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { LoadingCard } from '@/shared/components/ui/feedback/loading-card';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

export default function ProfileLoading() {
  return (
    <AnimateIn className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 sm:gap-6 xl:hidden">
        <div className="flex flex-col items-center gap-5 px-2 py-3 text-center sm:flex-row sm:px-4 sm:py-4 sm:text-left">
          <div className="relative shrink-0">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="border-background absolute -right-1 -top-1 size-8 rounded-full border-2" />
            <Skeleton className="border-background absolute -bottom-1 -right-1 size-8 rounded-full border-2" />
          </div>
          <div className="w-full space-y-2 sm:flex-1">
            <Skeleton className="mx-auto h-7 w-44 sm:mx-0" />
            <Skeleton className="mx-auto h-4 w-52 max-w-full sm:mx-0" />
            <Skeleton className="mx-auto h-6 w-36 rounded-full sm:mx-0" />
            <Skeleton className="mx-auto h-3 w-32 sm:mx-0" />
          </div>
        </div>

        <LoadingCard className="bg-surface/70 p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2.5">
            <Skeleton className="size-7 rounded-lg" />
            <Skeleton className="h-6 w-36" />
          </div>
          <div className="space-y-5">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="flex justify-end">
              <Skeleton className="h-10 w-48 rounded-lg" />
            </div>
          </div>
        </LoadingCard>

        <LoadingCard className="bg-surface/70 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-3">
            <Skeleton className="size-9 shrink-0 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-64 max-w-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-36 rounded-lg" />
        </LoadingCard>
      </div>

      <div className="hidden flex-1 items-start gap-6 xl:grid xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]">
        <LoadingCard className="from-primary/10 via-card/60 to-card/60 bg-linear-to-br p-7">
          <div className="flex items-center gap-5">
            <Skeleton className="size-20 shrink-0 rounded-full" />
            <div className="space-y-3">
              <div className="flex gap-2">
                <Skeleton className="h-11 w-36 rounded-lg" />
                <Skeleton className="h-11 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-48 max-w-full" />
            </div>
          </div>

          <div className="border-border mt-7 border-t pt-7">
            <div className="space-y-5">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-44 w-full rounded-lg" />
              <div className="flex justify-end">
                <Skeleton className="h-11 w-48 rounded-lg" />
              </div>
            </div>
          </div>
        </LoadingCard>

        <LoadingCard className="self-start p-7">
          <div className="mb-4 flex items-center gap-2.5">
            <Skeleton className="size-7 rounded-lg" />
            <Skeleton className="h-6 w-52 max-w-full" />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-5 w-44 max-w-full" />
              </div>
            ))}
            <div className="col-span-2 pt-1">
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          </div>
        </LoadingCard>
      </div>
    </AnimateIn>
  );
}
