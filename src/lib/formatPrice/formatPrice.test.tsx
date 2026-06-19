import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/formatPrice";

describe("formatPrice", () => {
  it("formats amount with EUR suffix", () => {
    expect(formatPrice(909)).toBe("909 EUR");
    expect(formatPrice(1329)).toBe("1329 EUR");
  });

  it("supports custom currency code", () => {
    expect(formatPrice(100, { currency: "USD" })).toBe("100 USD");
  });
});
