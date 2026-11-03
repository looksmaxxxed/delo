import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

export default function ClientsLoading() {
  return (
    <AnimateIn>
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-11 min-w-0 flex-1 rounded-lg" />
          <Skeleton className="h-11 w-full rounded-lg sm:w-40" />
        </div>

        <div className="surface-shadow border-sidebar-border bg-surface overflow-hidden rounded-2xl border">
          <div className="bg-primary/10 border-sidebar-border rounded-2xl border px-7 py-4">
            <div className="grid grid-cols-[minmax(200px,1.1fr)_minmax(180px,1fr)_minmax(180px,1fr)_140px_140px] items-center gap-5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="ml-auto h-3 w-20" />
              <Skeleton className="ml-auto h-3 w-20" />
            </div>
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-sidebar-border border-b px-7 py-3 last:border-0">
              <div className="grid grid-cols-[minmax(200px,1.1fr)_minmax(180px,1fr)_minmax(180px,1fr)_140px_140px] items-center gap-5">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="ml-auto h-4 w-20" />
                <Skeleton className="ml-auto h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
