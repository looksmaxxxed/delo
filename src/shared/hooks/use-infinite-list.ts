'use client';

import { useEffect, useRef, useState } from 'react';

type UseInfiniteListParams<T> = {
  initialItems: T[];
  initialHasMore: boolean;
  fetch: (offset: number, take: number) => Promise<{ items: T[]; hasMore: boolean }>;
  pageSize: number;
  deps?: unknown[];
};

type UseInfiniteListReturn<T> = {
  items: T[];
  hasMore: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  loadMore: () => Promise<void>;
  reload: () => Promise<void>;
  updateItem: (predicate: (item: T) => boolean, update: (item: T) => T) => void;
};

export function useInfiniteList<T>(params: UseInfiniteListParams<T>): UseInfiniteListReturn<T> {
  const { initialItems, initialHasMore, fetch, pageSize, deps = [] } = params;

  const didDepsChange = useRef(false);

  const [items, setItems] = useState<T[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (!didDepsChange.current) {
      didDepsChange.current = true;
      return;
    }

    async function reset() {
      setIsRefreshing(true);
      setIsLoadingMore(false);

      try {
        const result = await fetch(0, pageSize);
        setItems(result.items);
        setHasMore(result.hasMore);
      } finally {
        setIsRefreshing(false);
      }
    }

    void reset();
  }, deps);

  async function loadMore() {
    if (isRefreshing || isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    try {
      const result = await fetch(items.length, pageSize);
      setItems((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
    } finally {
      setIsLoadingMore(false);
    }
  }

  async function reload() {
    const result = await fetch(0, Math.max(items.length, pageSize));
    setItems(result.items);
    setHasMore(result.hasMore);
  }

  function updateItem(predicate: (item: T) => boolean, update: (item: T) => T) {
    setItems((currentItems) => currentItems.map((item) => (predicate(item) ? update(item) : item)));
  }

  return { items, hasMore, isRefreshing, isLoadingMore, loadMore, reload, updateItem };
}
