"use client";

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CartContextValue, CartItem } from "@/context/Cart/Cart.types";

const STORAGE_KEY = "zara-cart";

export const CartContext = createContext<CartContextValue | null>(null);

const readStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const skipSave = useRef(true);

  useEffect(() => {
    setItems(readStorage());
  }, []);

  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "cartItemId">) => {
    setItems((prev) => [...prev, { ...item, cartItemId: crypto.randomUUID() }]);
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const getItemCount = useCallback(() => items.length, [items]);

  const getTotalPrice = useCallback(
    () => items.reduce((sum, item) => sum + item.storage.price, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      getItemCount,
      getTotalPrice,
    }),
    [items, addItem, removeItem, getItemCount, getTotalPrice],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
