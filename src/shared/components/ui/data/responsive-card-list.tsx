'use client';

import { useEffect, useRef, type Key, type ReactNode } from 'react';
import { EmptyList } from '@/shared/components/ui/feedback/empty-list';
import { LoadingCard } from '@/shared/components/ui/feedback/loading-card';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

type ResponsiveCardListProps<T> = {
  items: T[];
  emptyMessage: string;
  isLoading: boolean;
  isLoadingMore: boolean;
  getItemKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
  onEndReached?: () => void | Promise<void>;
};

export function ResponsiveCardList<T>(props: ResponsiveCardListProps<T>) {
  const { items, emptyMessage, isLoading, isLoadingMore, getItemKey, renderItem, onEndReached } =
    props;
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !onEndReached || isLoading || isLoadingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void onEndReached();
      },
      { rootMargin: '240px 0px' }
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [isLoading, isLoadingMore, onEndReached]);

  if (isLoading) {
    return (
      <div className="grid gap-3 md:grid-cols-2 xl:hidden" role="status">
        <span className="sr-only">Загружаем данные…</span>
        {Array.from({ length: 4 }, (_, index) => (
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

  return (
    <div className="xl:hidden" aria-busy={isLoadingMore}>
      <EmptyList items={items} message={emptyMessage}>
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <div key={getItemKey(item)}>{renderItem(item)}</div>
          ))}
        </div>
        <div ref={sentinelRef} className="h-px" aria-hidden />
        {isLoadingMore && (
          <div className="flex items-center justify-center gap-2 py-5" role="status">
            <span className="sr-only">Загружаем ещё…</span>
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="size-2 rounded-full delay-75" />
            <Skeleton className="size-2 rounded-full delay-150" />
          </div>
        )}
      </EmptyList>
    </div>
  );
}
