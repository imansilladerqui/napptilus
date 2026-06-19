"use client";

import { useContext } from "react";
import { CartContext } from "@/context/Cart/CartContext";
import type { CartContextValue } from "@/context/Cart/Cart.types";

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
