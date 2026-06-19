import { useInfiniteQuery } from "@tanstack/react-query";
import type { ProductList } from "@/types";

export const PRODUCTS_PAGE_SIZE = 20;

export type InfiniteProductsParams = {
  search?: string;
};

export const useInfiniteProductsQuery = (params: InfiniteProductsParams) => {
  return useInfiniteQuery({
    queryKey: ["products", "list", params],
    queryFn: async ({ pageParam }): Promise<ProductList> => {
      const qs = new URLSearchParams();
      qs.set("limit", String(PRODUCTS_PAGE_SIZE));
      qs.set("offset", String(pageParam));
      if (params.search) qs.set("search", params.search);
      const res = await fetch(`/api/products?${qs.toString()}`);
      return res.json() as Promise<ProductList>;
    },
    select: (data) => ({
      pages: data.pages.map((page) =>
        Array.isArray(page) ? page.filter((item) => Boolean(item?.id)) : [],
      ),
      pageParams: data.pageParams,
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < PRODUCTS_PAGE_SIZE) return undefined;
      return lastPageParam + PRODUCTS_PAGE_SIZE;
    },
    staleTime: params.search ? 60 * 1000 : 5 * 60 * 1000,
  });
};
