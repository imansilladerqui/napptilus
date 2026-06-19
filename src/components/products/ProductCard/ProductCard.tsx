"use client";

import Link from "next/link";
import Image from "next/image";
import type { ProductListItem } from "@/types";
import { Money } from "@/components/ui/Money";
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  product: ProductListItem;
  priority?: boolean;
  variant?: "default" | "carousel";
};

export const ProductCard = ({
  product,
  priority = false,
  variant = "default",
}: ProductCardProps) => {
  const { id = "", name = "Sin nombre", brand = "", basePrice = 0, imageUrl = "" } = product;

  return (
    <article className={`${styles.card} ${variant === "default" ? styles.cardGrid : ""}`}>
      <Link href={`/products/${id}`} className={styles.link}>
        <div className={styles.imageWrap}>
          {imageUrl && (
            <div className={styles.imageInner}>
              <Image
                src={imageUrl}
                alt={name}
                fill
                priority={priority}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
                className={styles.image}
              />
            </div>
          )}
        </div>
        <div className={styles.body}>
          <p className={styles.brand}>{brand}</p>
          <div className={styles.namePriceRow}>
            <h2 className={styles.name}>{name}</h2>
            <Money amount={basePrice} className={styles.price} />
          </div>
        </div>
      </Link>
    </article>
  );
};
