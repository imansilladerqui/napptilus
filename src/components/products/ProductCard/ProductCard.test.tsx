import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/products/ProductCard";

describe("ProductCard", () => {
  it("renders product info", () => {
    render(
      <ProductCard
        product={{
          id: "SMG-S24U",
          brand: "Samsung",
          name: "Galaxy S24 Ultra",
          basePrice: 1200,
          imageUrl: "https://prueba-tecnica-api-tienda-moviles.onrender.com/img.jpg",
        }}
      />,
    );

    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("Samsung")).toBeInTheDocument();
  });
});
