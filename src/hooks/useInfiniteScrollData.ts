// import { useCallback, useEffect, useState } from "react";
// import useInfiniteScroll from "react-infinite-scroll-hook";

// type UseInfiniteScrollDataProps<T> = {
//   fetchPage: (page: number) => Promise<T[]>;
//   pageSize?: number;
//   maxPages?: number;
// };

// export function useInfiniteScrollData<T>({
//   fetchPage,
//   pageSize = 50,
//   maxPages = 5,
// }: UseInfiniteScrollDataProps<T>) {
//   const [data, setData] = useState<T[]>([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasNextPage, setHasNextPage] = useState(true);
//   const [error, setError] = useState<null | string>(null);

//   const load = useCallback(async () => {
//     if (loading || !hasNextPage) return;

//     setLoading(true);
//     try {
//       const newItems = await fetchPage(page);
//       setData((prev) => [...prev, ...newItems]);

//       if (newItems.length < pageSize || page >= maxPages) {
//         setHasNextPage(false);
//       } else {
//         setPage((p) => p + 1);
//       }
//     } catch (err) {
//       setError("Ошибка загрузки");
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchPage, page, pageSize, hasNextPage, loading]);

//   const [sentryRef] = useInfiniteScroll({
//     loading,
//     hasNextPage,
//     onLoadMore: load,
//     rootMargin: "10px 0px",
//   });

//   const reset = () => {
//     setData([]);
//     setPage(1);
//     setHasNextPage(true);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return {
//     data,
//     load,
//     loading,
//     sentryRef,
//     error,
//     reset,
//   };
// }

import { useState, useCallback, useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

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
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);
    try {
      const newItems = await fetchPage(page);
      setData((prev) => [...prev, ...newItems]);

      const isLastPage =
        newItems.length < pageSize || (maxPages && page >= maxPages);
      if (isLastPage) {
        setHasNextPage(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      setError(() => {
        const errorMessage =
          error instanceof Error ? error.message : "Неизвестная ошибка";

        return errorMessage;
      });
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

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: load,
    rootMargin: "20px 0px",
  });

  useEffect(() => {
    load(); // загрузка первой страницы
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
