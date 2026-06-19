"use client";

import { EmptySearchResults } from "@/components/feedback/EmptySearchResults";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SearchBar } from "@/components/products/SearchBar";
import { useProductListing } from "./useProductListing";
import styles from "./ProductListing.module.scss";

export const ProductListing = () => {
  const {
    query,
    setQuery,
    data,
    isPending,
    isFetching,
    showEmptySearch,
    debouncedSearch,
    resultCount,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
  } = useProductListing();

  const showGrid = !isPending && !showEmptySearch && !!data?.length;

  return (
    <section className={styles.root} aria-label="Listado de smartphones">
      <SearchBar
        query={query}
        setQuery={setQuery}
        resultCount={resultCount}
        isFetching={isFetching}
      />
      <div className={styles.content}>
        {isPending && <div className={styles.skeleton} aria-busy="true" />}
        {!isPending && showEmptySearch && <EmptySearchResults query={debouncedSearch} />}
        {showGrid && (
          <>
            <ProductGrid products={data} />
            {hasNextPage && (
              <div ref={loadMoreRef} className={styles.loadMore} aria-hidden="true" />
            )}
            {isFetchingNextPage && <div className={styles.skeleton} aria-busy="true" />}
          </>
        )}
      </div>
    </section>
  );
};
