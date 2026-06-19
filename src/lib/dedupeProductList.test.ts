import { describe, expect, it } from "vitest";
import { dedupeProductList } from "@/lib/dedupeProductList";

describe("dedupeProductList", () => {
  it("removes duplicate product ids keeping first occurrence", () => {
    const result = dedupeProductList([
      { id: "XMI-RN13P5G", name: "A" },
      { id: "XMI-RN13P5G", name: "B" },
      { id: "OTHER", name: "C" },
    ]);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("A");
    expect(result[1].id).toBe("OTHER");
  });
});
