import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Money } from "@/components/ui/Money";

describe("Money", () => {
  it("renders amount with EUR suffix", () => {
    render(<Money amount={1329} />);
    expect(screen.getByText("1329 EUR")).toBeInTheDocument();
  });

  it("applies className", () => {
    render(<Money amount={100} className="price" />);
    expect(screen.getByText("100 EUR")).toHaveClass("price");
  });
});
