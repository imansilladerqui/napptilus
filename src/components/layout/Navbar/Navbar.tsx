"use client";

import Link from "next/link";
import { useNavbar } from "@/components/layout/Navbar/useNavbar";
import { CartIcon } from "@/components/ui/icons/CartIcon";
import { MbstLogo } from "@/components/ui/icons/MbstLogo";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const { itemCount } = useNavbar();

  return (
    <nav className={styles.nav} aria-label="Principal">
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label="Ir al inicio">
          <MbstLogo />
        </Link>
        <Link
          href="/cart"
          className={styles.cartLink}
          aria-label={`Carrito, ${itemCount} artículos`}
        >
          <CartIcon filled={itemCount > 0} />
          <span className={styles.count} aria-hidden="true">
            {itemCount}
          </span>
        </Link>
      </div>
    </nav>
  );
};
