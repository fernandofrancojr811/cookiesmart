
import { DensityMap, IngredientToken, NormalizedIngredient, NormalizedRecipe, ParsedRecipe } from "./types";
import { VOLUME_TO_ML, MASS_TO_G } from "./units";
import { DENSITY } from "./densities";

function canonicalKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g," ").trim();
}

function toGrams(tok: IngredientToken, densityMap: DensityMap): number {
  const key = canonicalKey(tok.name);
  const density = densityMap[key];
  const unit = tok.unit.toLowerCase();

  if (MASS_TO_G[unit] != null) return tok.qty * MASS_TO_G[unit];

  if (density?.unitToGram?.[unit] != null) return tok.qty * density.unitToGram[unit];

  if (VOLUME_TO_ML[unit] != null && density?.gPerMl != null) {
    return tok.qty * VOLUME_TO_ML[unit] * density.gPerMl;
  }

  // Fallback: treat unknown unitless as grams
  return tok.qty;
}

export function normalizeRecipe(p: ParsedRecipe): NormalizedRecipe {
  const items: NormalizedIngredient[] = p.ingredients.map(src => {
    const grams = toGrams(src, DENSITY);
    return { name: canonicalKey(src.name), grams, displayName: src.name, source: src };
  });
  return { servingsOriginal: p.servingsOriginal, items, meta: { title: p.title, description: p.description } };
}
