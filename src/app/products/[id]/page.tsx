"use client";

import { use } from "react";
import { BackButton } from "@/components/product-detail/BackButton";
import { ProductDetail } from "@/components/product-detail/ProductDetail";
import { ProductNotFound } from "@/components/feedback/ProductNotFound";
import { useProductQuery } from "@/api/useProductQuery";
import type { ProductPageProps } from "@/app/products/[id]/page.types";
import styles from "./page.module.scss";

const ProductPage = ({ params }: ProductPageProps) => {
  const { id } = use(params);
  const { data, isPending } = useProductQuery(id);

  return (
    <div className={styles.root}>
      <div className={styles.back}>
        <BackButton />
      </div>
      {isPending ? (
        <div className={styles.skeleton} aria-busy="true" />
      ) : !data ? (
        <ProductNotFound />
      ) : (
        <ProductDetail product={data} />
      )}
    </div>
  );
};

export default ProductPage;
