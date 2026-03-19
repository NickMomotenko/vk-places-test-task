import { useState, useCallback, useEffect } from "react";
import type { FilmType } from "../helpers/types";
import { useSentryRef } from "./useSentryRef";

interface InfiniteScrollOptions<T> {
  fetchPage: (page: number) => Promise<T[]>;
  pageSize?: number;
  maxPages?: number;
}

export function useInfiniteScrollData<T>({
  fetchPage,
  pageSize = 10,
  maxPages,
}: InfiniteScrollOptions<T>) {
  const [data, setData] = useState<FilmType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);
    try {
      const newItems = await fetchPage(page);
      setData((prev:any) => [...prev, ...newItems]);

      const isLastPage =
        newItems.length < pageSize || (maxPages && page >= maxPages);
      if (isLastPage) {
        setHasNextPage(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Неизвестная ошибка"
      );
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  }, [page, fetchPage, loading, hasNextPage, pageSize, maxPages]);

  const reset = () => {
    setData([]);
    setPage(1);
    setHasNextPage(true);
    setError(null);
  };

  const sentryRef = useSentryRef({ loading, hasNextPage, onLoadMore: load });

  useEffect(() => {
    load();
  }, []);

  return {
    data,
    loading,
    error,
    sentryRef,
    reset,
    load,
  };
}