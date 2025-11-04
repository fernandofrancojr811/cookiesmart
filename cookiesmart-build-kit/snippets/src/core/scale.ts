
import { NormalizedRecipe } from "./types";
export function scaleRecipe(r: NormalizedRecipe, currentServings: number): NormalizedRecipe {
  const factor = currentServings / r.servingsOriginal;
  return { ...r, items: r.items.map(it => ({ ...it, grams: it.grams * factor })) };
}
