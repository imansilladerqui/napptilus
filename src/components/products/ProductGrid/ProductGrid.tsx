import type { ProductListItem } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import styles from "./ProductGrid.module.scss";

type ProductGridProps = {
  products: ProductListItem[];
};

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <ul className={styles.grid}>
      {products.map((product, index) => (
        <li key={product.id} className={styles.item}>
          <ProductCard product={product} priority={index === 0} />
        </li>
      ))}
    </ul>
  );
};
