import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';
import { ResponsiveListLoading } from '@/shared/components/ui/feedback/responsive-list-loading';

export default function ReportsLoading() {
  return (
    <AnimateIn>
      <div className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <Skeleton className="h-11 min-w-0 flex-1 rounded-lg" />
          <div className="grid gap-3 sm:grid-cols-3 lg:flex">
            <Skeleton className="h-11 w-full rounded-lg lg:w-44" />
            <Skeleton className="h-11 w-full rounded-lg lg:w-40" />
            <Skeleton className="h-11 w-full rounded-lg lg:w-40" />
          </div>
        </div>

        <ResponsiveListLoading />

        <div className="surface-shadow border-sidebar-border bg-surface hidden overflow-hidden rounded-2xl border xl:block">
          <div className="bg-primary/10 border-sidebar-border rounded-2xl border px-7 py-4">
            <div className="grid grid-cols-[220px_110px_minmax(260px,1fr)_180px_180px_100px] items-center gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-3 w-20" />
              ))}
            </div>
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border-sidebar-border border-b px-7 py-3 last:border-0">
              <div className="grid grid-cols-[220px_110px_minmax(260px,1fr)_180px_180px_100px] items-center gap-5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mx-auto h-4 w-8" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="ml-auto h-4 w-28" />
                <Skeleton className="ml-auto h-5 w-28 rounded-sm" />
                <Skeleton className="ml-auto size-7 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
