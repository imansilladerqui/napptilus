import type { ProductListItem } from "@/types";

export const dedupeProductList = (products: ProductListItem[]): ProductListItem[] => {
  const seen = new Set<string>();

  return products.filter((product) => {
    const id = product.id;
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
};
