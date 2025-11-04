import { describe, it, expect } from "vitest";
import { toNumber, normalizeUnit } from "@/src/core/units";

describe("units", () => {
  it("parses fractions and mixed numbers", () => {
    expect(toNumber("1/2")).toBeCloseTo(0.5);
    expect(toNumber("1 1/2")).toBeCloseTo(1.5);
    expect(toNumber("2")).toBe(2);
  });
  it("normalizes units", () => {
    expect(normalizeUnit("Teaspoons")).toBe("tsp");
    expect(normalizeUnit("Tablespoon")).toBe("tbsp");
    expect(normalizeUnit("Cups")).toBe("cup");
  });
});
