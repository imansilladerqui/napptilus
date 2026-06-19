"use client";

import { useCallback } from "react";
import Image from "next/image";
import { Money } from "@/components/ui/Money";
import { useCart } from "@/context/Cart";
import type { CartItem as CartItemType } from "@/context/Cart";
import styles from "./CartItem.module.scss";

type CartItemProps = {
  item: CartItemType;
};

export const CartItem = ({ item }: CartItemProps) => {
  const { removeItem } = useCart();
  const handleRemove = useCallback(
    () => removeItem(item.cartItemId),
    [item.cartItemId, removeItem],
  );

  return (
    <div className={styles.root}>
      <div className={styles.imageWrap}>
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={262}
            height={324}
            sizes="262px"
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.details}>
          <h2 className={styles.name}>{item.name}</h2>
          <p className={styles.specs}>
            {item.storage.capacity} | {item.color.name}
          </p>
          <Money amount={item.storage.price} className={styles.price} />
        </div>
        <button
          type="button"
          className={styles.remove}
          onClick={handleRemove}
          aria-label={`Eliminar ${item.name}`}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
