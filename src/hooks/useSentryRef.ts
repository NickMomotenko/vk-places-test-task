import useInfiniteScroll from "react-infinite-scroll-hook";

export function useSentryRef({
  loading = false,
  hasNextPage,
  onLoadMore,
}: {
  loading?: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}) {
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    rootMargin: "20px 0px",
  });

  return sentryRef;
}
