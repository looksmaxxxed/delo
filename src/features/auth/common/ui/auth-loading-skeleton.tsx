import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

type AuthLoadingSkeletonProps = {
  fields?: number;
  variant?: 'form' | 'status';
  showForgotLink?: boolean;
  showAgreement?: boolean;
  showInfo?: boolean;
  showButton?: boolean;
};

export function AuthLoadingSkeleton(props: AuthLoadingSkeletonProps) {
  const {
    fields = 0,
    variant = 'form',
    showForgotLink,
    showAgreement,
    showInfo,
    showButton = true,
  } = props;

  if (variant === 'status') {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-20 w-full rounded-xl" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-48" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
        {showButton && <Skeleton className="xl:h-13 h-11 w-full rounded-lg" />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="relative">
            <Skeleton className="border-border bg-secondary/70 h-12 w-full rounded-lg border" />
            <Skeleton className="bg-surface absolute left-3 top-0 h-3 w-24 -translate-y-1/2" />
          </div>
        ))}

        {showForgotLink && (
          <div className="flex justify-end">
            <Skeleton className="h-4 w-28" />
          </div>
        )}

        {showInfo && <Skeleton className="h-24 w-full rounded-xl" />}

        {showAgreement && (
          <div className="flex items-start gap-3">
            <Skeleton className="size-5 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        )}
      </div>

      {showButton && <Skeleton className="xl:h-13 h-11 w-full rounded-lg" />}
    </div>
  );
}
