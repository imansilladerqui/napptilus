"use client";

import { useCart } from "@/context/Cart";

export const useNavbar = () => {
  const { getItemCount } = useCart();
  return { itemCount: getItemCount() };
};
