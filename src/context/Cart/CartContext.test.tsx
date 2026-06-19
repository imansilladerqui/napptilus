import { describe, expect, it, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider } from "@/context/Cart/CartContext";
import { useCart } from "@/context/Cart/useCart";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => <CartProvider>{children}</CartProvider>;

describe("Cart", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal("crypto", {
      randomUUID: () => "test-uuid-1",
    });
  });

  it("adds and removes items and calculates total", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        productId: "1",
        name: "Phone",
        brand: "Brand",
        imageUrl: "https://example.com/img.jpg",
        color: { name: "Black", hexCode: "#000" },
        storage: { capacity: "128GB", price: 900 },
      });
    });

    expect(result.current.getItemCount()).toBe(1);
    expect(result.current.getTotalPrice()).toBe(900);

    act(() => {
      result.current.removeItem("test-uuid-1");
    });

    expect(result.current.getItemCount()).toBe(0);
  });
});
