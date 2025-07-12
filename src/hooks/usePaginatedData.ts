import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

type UseInfiniteScrollFromItemsProps<T> = {
  items: T[];
  pageSize?: number;
};


export function useInfiniteScrollFromItems<T>({
  items,
  pageSize = 10,
}: {
  items: T[];
  pageSize?: number;
}) {
  const [page, setPage] = useState(1);
  const prevItemsLength = useRef(items.length);

  const data = useMemo(() => {
    return items.slice(0, page * pageSize);
  }, [items, page, pageSize]);

  const hasNextPage = data.length < items.length;

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const reset = useCallback(() => {
    setPage(1);
  }, []);

  // Умный сброс только при уменьшении общего количества (например, удаление)
  useEffect(() => {
    if (items.length < prevItemsLength.current) {
      // Было удаление, не сбрасываем page
      // но если удалили настолько, что текущая page слишком большая, корректируем
      const maxPage = Math.ceil(items.length / pageSize);
      if (page > maxPage) {
        setPage(maxPage);
      }
    }

    prevItemsLength.current = items.length;
  }, [items.length, page, pageSize]);

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: "20px 0px",
  });

  return {
    data,
    hasNextPage,
    sentryRef,
    reset,
  };
}
