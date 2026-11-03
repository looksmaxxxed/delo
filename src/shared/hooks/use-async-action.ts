'use client';

import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

export function useAsyncAction<TArgs extends unknown[]>(fn: (...args: TArgs) => Promise<void>) {
  const [isLoading, setIsLoading] = useState(false);
  const executionIdRef = useRef(0);

  const execute = useCallback(
    async (...args: TArgs) => {
      const executionId = ++executionIdRef.current;
      setIsLoading(true);
      try {
        await fn(...args);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Произошла непредвиденная ошибка');
      } finally {
        if (executionIdRef.current === executionId) setIsLoading(false);
      }
    },
    [fn]
  );

  const resetLoading = useCallback(() => {
    executionIdRef.current += 1;
    setIsLoading(false);
  }, []);

  return [execute, isLoading, resetLoading] as const;
}
