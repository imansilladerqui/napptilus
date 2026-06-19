"use client";

import { Button, ButtonLink } from "@/components/ui/Button";
import { Money } from "@/components/ui/Money";
import { useCart } from "@/context/Cart";
import styles from "./CartSummary.module.scss";

export const CartSummary = () => {
  const { getTotalPrice } = useCart();
  const total = getTotalPrice();

  return (
    <div className={styles.root}>
      <div className={styles.colStart}>
        <ButtonLink href="/" variant="secondary" className={styles.continue}>
          Continue shopping
        </ButtonLink>
      </div>
      <div className={styles.colCenter}>
        <p className={styles.total}>
          <span>Total</span>
          <Money amount={total} />
        </p>
      </div>
      <div className={styles.colEnd}>
        <Button type="button" className={styles.pay}>
          Pay
        </Button>
      </div>
    </div>
  );
};
