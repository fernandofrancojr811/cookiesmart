import { IngredientToken, ParsedRecipe } from "./types";
import { normalizeUnit, toNumber } from "./units";

const looksLikeTitle = (line: string) => {
  const hasDigit = /\d/.test(line);
  const hasUnit = /\b(tsp|tbsp|cup|cups|oz|ounce|g|gram|ml|l|lb)\b/i.test(line);
  return !hasDigit && !hasUnit && line.length >= 3;
};

export function parseFreeform(text: string, servings: number): ParsedRecipe {
  const lines = text.split(/\r?\n/).map(l => l.trim());
  const nonEmpty = lines.filter(Boolean);
  let title: string | undefined;
  if (nonEmpty.length && looksLikeTitle(nonEmpty[0])) {
    title = nonEmpty[0];
    nonEmpty.shift();
  }
  const ingredients: IngredientToken[] = [];
  for (const line of nonEmpty) {
    const m = line.match(/^([\d\/\s\.]+)\s*([a-zA-Z]+)\s+(.*)$/);
    if (m) {
      const qty = toNumber(m[1]);
      const unit = normalizeUnit(m[2]);
      ingredients.push({ raw: line, qty, unit, name: m[3] });
    } else if (line) {
      ingredients.push({ raw: line, qty: 1, unit: "", name: line });
    }
  }
  return { title, servingsOriginal: servings || 1, ingredients };
}
