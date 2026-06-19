"use client";

import { useCallback, useState } from "react";
import { useCart } from "@/context/Cart";
import type { ColorOption, Product, StorageOption } from "@/types";

export const useProductDetail = (product: Product) => {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);

  const currentImageUrl = selectedColor?.imageUrl ?? product.colorOptions?.[0]?.imageUrl ?? "";
  const canAddToCart = Boolean(selectedColor && selectedStorage);

  const handleAddToCart = useCallback(() => {
    if (!selectedColor || !selectedStorage) return;
    addItem({
      productId: product.id ?? "",
      name: product.name ?? "",
      brand: product.brand ?? "",
      imageUrl: selectedColor.imageUrl ?? "",
      color: { name: selectedColor.name ?? "", hexCode: selectedColor.hexCode ?? "" },
      storage: {
        capacity: selectedStorage.capacity ?? "",
        price: selectedStorage.price ?? 0,
      },
    });
  }, [product, selectedColor, selectedStorage, addItem]);

  return {
    selectedColor,
    selectedStorage,
    setSelectedColor,
    setSelectedStorage,
    currentImageUrl,
    canAddToCart,
    handleAddToCart,
  };
};
