import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

export function PageHeaderSkeleton() {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 sm:gap-3">
      <Skeleton className="size-11 rounded-lg sm:size-14" />
      <div className="min-w-0 space-y-2">
        <Skeleton className="h-7 w-56 max-w-full" />
        <Skeleton className="hidden h-4 w-40 max-w-full sm:block" />
      </div>
    </div>
  );
}
