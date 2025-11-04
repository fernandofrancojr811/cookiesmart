import { IngredientToken, ParsedRecipe } from "./types";
import { normalizeUnit, toNumber } from "./units";

export function parseFreeform(text: string, servings: number): ParsedRecipe {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const ingredients: IngredientToken[] = [];
  for (const line of lines) {
    const m = line.match(/^([\d\/\s\.]+)\s*([a-zA-Z]+)\s+(.*)$/);
    if (m) {
      const qty = toNumber(m[1]);
      const unit = normalizeUnit(m[2]);
      ingredients.push({ raw: line, qty, unit, name: m[3] });
    } else {
      ingredients.push({ raw: line, qty: 1, unit: "", name: line });
    }
  }
  return { servingsOriginal: servings || 1, ingredients };
}
