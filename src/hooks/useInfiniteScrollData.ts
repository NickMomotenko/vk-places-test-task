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

type InfiniteScrollOptions<T> =
  | {
      fetchPage: (page: number) => Promise<T[]>;
      pageSize?: number;
      maxPages?: number;
      items?: never;
    }
  | {
      items: T[];
      pageSize?: number;
      maxPages?: never;
      fetchPage?: never;
    };

export function useInfiniteScrollData<T>({
  fetchPage,
  items,
  pageSize = 10,
  maxPages,
}: InfiniteScrollOptions<T>) {
  const isStatic = !!items;

  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getItems = useCallback(
    async (page: number): Promise<T[]> => {
      if (isStatic && items) {
        const start = (page - 1) * pageSize;
        return items.slice(start, start + pageSize);
      }
      if (fetchPage) {
        return fetchPage(page);
      }
      return [];
    },
    [fetchPage, items, isStatic, pageSize]
  );

  const load = useCallback(async () => {
    if (loading || !hasNextPage) return;
    setLoading(true);

    try {
      const newItems = await getItems(page);
      setData((prev) => [...prev, ...newItems]);

      const totalPages =
        isStatic && items ? Math.ceil(items.length / pageSize) : maxPages;

      if (newItems.length < pageSize || (totalPages && page >= totalPages)) {
        setHasNextPage(false);
      } else {
        setPage((p) => p + 1);
      }
    } catch (err) {
      setError("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  }, [page, getItems, loading, hasNextPage, pageSize, maxPages]);

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
    load();
  }, [items]);

  return {
    data,
    loading,
    error,
    sentryRef,
    reset,
    load,
  };
}
