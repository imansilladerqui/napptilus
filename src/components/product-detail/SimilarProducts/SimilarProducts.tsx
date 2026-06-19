"use client";

import type { ProductListItem } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { dedupeProductList } from "@/lib/dedupeProductList";
import { useSimilarProductsCarousel } from "@/components/product-detail/SimilarProducts/useSimilarProductsCarousel";
import styles from "./SimilarProducts.module.scss";

type SimilarProductsProps = {
  products: ProductListItem[];
};

export const SimilarProducts = ({ products }: SimilarProductsProps) => {
  const uniqueProducts = dedupeProductList(products);
  const { trackRef, thumbRatio, offsetRatio } = useSimilarProductsCarousel();

  if (!uniqueProducts.length) return null;

  const thumbWidth = `${thumbRatio * 100}%`;
  const thumbOffset = `${offsetRatio * (100 - thumbRatio * 100)}%`;

  return (
    <section aria-labelledby="similar-title">
      <h2 id="similar-title" className={styles.title}>
        Similar items
      </h2>
      <div className={styles.carousel}>
        <ul ref={trackRef} className={styles.track} aria-label="Similar items carousel">
          {uniqueProducts.map((product) => (
            <li key={product.id} className={styles.slide}>
              <ProductCard product={product} variant="carousel" />
            </li>
          ))}
        </ul>
        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressThumb}
            style={{ width: thumbWidth, marginLeft: thumbOffset }}
          />
        </div>
      </div>
    </section>
  );
};
