import { LoadingCard } from '@/shared/components/ui/feedback/loading-card';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

type ResponsiveListLoadingProps = {
  count?: number;
};

export function ResponsiveListLoading(props: ResponsiveListLoadingProps) {
  const { count = 4 } = props;

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:hidden">
      {Array.from({ length: count }, (_, index) => (
        <LoadingCard key={index} className="space-y-5 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }, (_, itemIndex) => (
              <div key={itemIndex} className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-24 max-w-full" />
              </div>
            ))}
          </div>
        </LoadingCard>
      ))}
    </div>
  );
}
