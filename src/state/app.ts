import { proxy } from "valtio";
import type { ParsedRecipe, NormalizedRecipe, NutritionTotals } from "@/src/core/types";

export const appState = proxy({
  rawText: "",
  servingsOriginal: 8,
  currentServings: 8,
  targetUnit: "grams" as "grams"|"oz"|"cups_tbsp",
  decimals: 1,
  parsed: null as ParsedRecipe|null,
  normalized: null as NormalizedRecipe|null,
  scaled: null as NormalizedRecipe|null,
  nutritionTotals: null as NutritionTotals|null,
  nutritionPerServing: null as NutritionTotals|null,
  allergens: [] as {name:string; level:"Certain"|"Possible"}[],
});
