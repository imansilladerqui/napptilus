export type CartItem = {
  cartItemId: string;
  productId: string;
  name: string;
  brand: string;
  imageUrl: string;
  color: { name: string; hexCode: string };
  storage: { capacity: string; price: number };
};

export type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartItemId">) => void;
  removeItem: (cartItemId: string) => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
};
