import type { NutritionTable, NutritionTotals, NormalizedRecipe } from "./types";

export const NUTRITION_100G: NutritionTable = {
  "all purpose flour": { kcal: 364, protein_g: 10.3, carbs_g: 76, fat_g: 1 },
  "granulated sugar":  { kcal: 387, protein_g: 0, carbs_g: 100, fat_g: 0 },
  "brown sugar":       { kcal: 380, protein_g: 0, carbs_g: 98,  fat_g: 0 },
  "butter":            { kcal: 717, protein_g: 0.85, carbs_g: 0.06, fat_g: 81.1 },
  "milk":              { kcal: 60,  protein_g: 3.2, carbs_g: 5,   fat_g: 3.3 },
  "water":             { kcal: 0,   protein_g: 0,   carbs_g: 0,   fat_g: 0 },
};

export function computeTotals(r: NormalizedRecipe): NutritionTotals {
  let kcal=0, p=0, c=0, f=0;
  r.items.forEach(it => {
    const row = NUTRITION_100G[it.name];
    if (!row) return;
    const factor = it.grams / 100;
    kcal += row.kcal * factor; p += row.protein_g * factor;
    c += row.carbs_g * factor; f += row.fat_g * factor;
  });
  return { kcal, protein_g: p, carbs_g: c, fat_g: f };
}
