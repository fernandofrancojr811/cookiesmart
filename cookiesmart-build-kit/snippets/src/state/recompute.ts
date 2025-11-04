
import { appState } from "./app";
import { parseFreeform } from "@/src/core/parser";
import { normalizeRecipe } from "@/src/core/normalize";
import { scaleRecipe } from "@/src/core/scale";
import { computeTotals } from "@/src/core/nutrition";
import { detectAllergens } from "@/src/core/allergens";

export function recompute() {
  const parsed = parseFreeform(appState.rawText, appState.servingsOriginal);
  const normalized = normalizeRecipe(parsed);
  const scaled = scaleRecipe(normalized, appState.currentServings);
  const totals = computeTotals(scaled);
  const per = {
    kcal: totals.kcal / Math.max(1, appState.currentServings),
    protein_g: totals.protein_g / Math.max(1, appState.currentServings),
    carbs_g: totals.carbs_g / Math.max(1, appState.currentServings),
    fat_g: totals.fat_g / Math.max(1, appState.currentServings),
  };
  const allergenReport = detectAllergens(parsed.ingredients.map(i => i.name));
  appState.parsed = parsed;
  appState.normalized = normalized;
  appState.scaled = scaled;
  appState.nutritionTotals = totals;
  appState.nutritionPerServing = per;
  appState.allergens = allergenReport.hits.map(h => ({ name: h.name, level: h.level }));
}
