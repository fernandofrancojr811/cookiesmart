import { describe, it, expect } from "vitest";
import { normalizeRecipe } from "@/src/core/normalize";
import { scaleRecipe } from "@/src/core/scale";
import { parseFreeform } from "@/src/core/parser";

describe("scale", () => {
  it("scales quantities by servings", () => {
    const p = parseFreeform("1 cup all purpose flour", 2);
    const n = normalizeRecipe(p);
    const s = scaleRecipe(n, 4);
    const g = s.items[0].grams;
    // 1 cup flour ~ 120g, doubled servings => 240g
    expect(g).toBeCloseTo(240, 1);
  });
});
