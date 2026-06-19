import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";

export const useProductQuery = (id: string) => {
  return useQuery({
    queryKey: ["products", "detail", id],
    queryFn: async (): Promise<Product> => {
      const res = await fetch(`/api/products/${encodeURIComponent(id)}`);
      return res.json() as Promise<Product>;
    },
    select: (product) => (product?.id ? product : undefined),
    enabled: Boolean(id),
    staleTime: 10 * 60 * 1000,
  });
};
