"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteProductsQuery } from "@/api/useInfiniteProductsQuery";
import { useDebounce } from "@/lib/useDebounce";
import { dedupeProductList } from "@/lib/dedupeProductList";

const DEBOUNCE_MS = 300;
const MIN_SEARCH_LENGTH = 3;

export const useProductListing = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS).trim();
  const hasSearch = debouncedQuery.length >= MIN_SEARCH_LENGTH;
  const debouncedSearch = hasSearch ? debouncedQuery : "";

  const {
    data: queryData,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProductsQuery(hasSearch ? { search: debouncedSearch } : {});

  const data = useMemo(
    () => (queryData?.pages.length ? dedupeProductList(queryData.pages.flat()) : undefined),
    [queryData],
  );

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) fetchNextPage();
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const resultCount = data?.length ?? 0;

  return {
    query,
    setQuery,
    data,
    isPending,
    isFetching,
    showEmptySearch: hasSearch && !isPending && resultCount === 0,
    debouncedSearch,
    resultCount,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
  };
};
