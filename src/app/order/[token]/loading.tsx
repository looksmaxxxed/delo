import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { LoadingCard } from '@/shared/components/ui/feedback/loading-card';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

export default function PublicOrderLoading() {
  return (
    <AnimateIn className="space-y-6">
      <LoadingCard className="from-primary/10 via-card to-card bg-linear-to-br p-4 sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <Skeleton className="size-7 shrink-0 rounded-lg" />
            <Skeleton className="h-7 w-64 max-w-full sm:w-96" />
          </div>
          <Skeleton className="h-5 w-24 shrink-0 rounded-sm" />
        </div>
        <div className="mt-5 space-y-2">
          <Skeleton className="h-4 w-full max-w-3xl" />
          <Skeleton className="h-4 w-4/5 max-w-2xl" />
        </div>
        <div className="border-primary/10 bg-background/60 mt-6 grid gap-x-6 gap-y-4 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-32 max-w-full" />
            </div>
          ))}
        </div>
      </LoadingCard>

      <LoadingCard className="p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2.5">
          <Skeleton className="size-7 rounded-lg" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="-mx-1 overflow-hidden px-1 pb-1">
          <div className="min-w-160 flex sm:min-w-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-center">
                  <Skeleton className="h-0.5 flex-1" />
                  <Skeleton className="size-8 shrink-0 rounded-full" />
                  <Skeleton className="h-0.5 flex-1" />
                </div>
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </LoadingCard>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-6">
          <LoadingCard className="flex h-full min-h-0 flex-col p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-7 rounded-lg" />
                <Skeleton className="h-5 w-28" />
              </div>
              <Skeleton className="h-4 w-5" />
            </div>
            <div className="mb-2 flex justify-between gap-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="divide-border divide-y">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex justify-between gap-4 py-3">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
            <div className="border-border mt-2 flex justify-between border-t pt-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-20" />
            </div>
          </LoadingCard>

          <LoadingCard className="p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <Skeleton className="size-7 rounded-lg" />
              <Skeleton className="h-5 w-52" />
            </div>
            <div className="border-border space-y-3 border-t pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </LoadingCard>
        </div>

        <div className="h-full">
          <LoadingCard className="flex h-full flex-col p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-7 rounded-lg" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-5 w-24 rounded-sm" />
            </div>
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex min-h-0 flex-1 flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="border-border flex min-h-0 flex-1 flex-col space-y-2 border-y py-4">
                  <div className="flex justify-between gap-4">
                    <Skeleton className="h-3 w-14" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                  <Skeleton className="h-14 w-full rounded-lg" />
                  <Skeleton className="h-14 w-full rounded-lg" />
                </div>
              </div>
              <div className="space-y-5">
                <Skeleton className="h-20 w-full rounded-xl" />
                <div className="border-primary/20 bg-primary/5 space-y-4 rounded-xl border p-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full rounded-lg xl:h-11" />
                </div>
              </div>
            </div>
          </LoadingCard>
        </div>
      </div>
    </AnimateIn>
  );
}
