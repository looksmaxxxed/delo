import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

export default function OrdersLoading() {
  return (
    <AnimateIn>
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
            <Skeleton className="h-11 min-w-0 flex-1 rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg sm:w-40" />
          </div>
          <Skeleton className="h-11 w-full rounded-lg lg:w-32" />
        </div>

        <div className="surface-shadow border-sidebar-border bg-surface overflow-hidden rounded-2xl border">
          <div className="bg-primary/10 border-sidebar-border rounded-2xl border px-7 py-4">
            <div className="grid grid-cols-[minmax(260px,1.4fr)_minmax(180px,1fr)_140px_140px_150px] items-center gap-5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="ml-auto h-3 w-20" />
              <Skeleton className="ml-auto h-3 w-20" />
              <Skeleton className="ml-auto h-3 w-20" />
            </div>
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-sidebar-border border-b px-7 py-3 last:border-0">
              <div className="grid grid-cols-[minmax(260px,1.4fr)_minmax(180px,1fr)_140px_140px_150px] items-center gap-5">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="ml-auto h-4 w-24" />
                <Skeleton className="ml-auto h-4 w-20" />
                <Skeleton className="ml-auto h-5 w-24 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
