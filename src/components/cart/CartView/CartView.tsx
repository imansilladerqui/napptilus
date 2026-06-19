"use client";

import { ButtonLink } from "@/components/ui/Button";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/context/Cart";
import styles from "./CartView.module.scss";

export const CartView = () => {
  const { items, getItemCount } = useCart();
  const itemCount = getItemCount();
  const isEmpty = items.length === 0;

  return (
    <section className={styles.root} aria-labelledby="cart-title">
      <div className={styles.content}>
        <h1 id="cart-title" className={styles.title}>
          Cart ({itemCount})
        </h1>
        {!isEmpty && (
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.cartItemId}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <footer className={styles.footer}>
        {isEmpty ? (
          <ButtonLink href="/" variant="secondary" className={styles.continue}>
            Continue shopping
          </ButtonLink>
        ) : (
          <CartSummary />
        )}
      </footer>
    </section>
  );
};
