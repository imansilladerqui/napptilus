"use client";

import Image from "next/image";
import { AddToCartButton } from "@/components/product-detail/AddToCartButton";
import { ColorSelector } from "@/components/product-detail/ColorSelector";
import { SimilarProducts } from "@/components/product-detail/SimilarProducts";
import { SpecsTable } from "@/components/product-detail/SpecsTable";
import { StorageSelector } from "@/components/product-detail/StorageSelector";
import { Money } from "@/components/ui/Money";
import { useProductDetail } from "@/components/product-detail/ProductDetail/useProductDetail";
import type { Product } from "@/types";
import styles from "./ProductDetail.module.scss";

type ProductDetailProps = {
  product: Product;
};

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const {
    selectedColor,
    selectedStorage,
    setSelectedColor,
    setSelectedStorage,
    currentImageUrl,
    canAddToCart,
    handleAddToCart,
  } = useProductDetail(product);

  return (
    <div className={styles.root}>
      <div className={styles.hero}>
        <div className={styles.imageWrap}>
          {currentImageUrl && (
            <Image
              src={currentImageUrl}
              alt={`${product.name} en color ${selectedColor?.name ?? ""}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.infoCol}>
          <div className={styles.colWrapper}>
            <div className={styles.headline}>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.price}>
                From <Money amount={product.basePrice ?? 0} />
              </p>
            </div>
            <StorageSelector
              options={product.storageOptions ?? []}
              selected={selectedStorage}
              onSelect={setSelectedStorage}
            />
            <ColorSelector
              options={product.colorOptions ?? []}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
            <div className={styles.addBar}>
              <AddToCartButton disabled={!canAddToCart} onClick={handleAddToCart} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sections}>
        <SpecsTable brand={product.brand} description={product.description} specs={product.specs} />
        <SimilarProducts products={product.similarProducts ?? []} />
      </div>
    </div>
  );
};
