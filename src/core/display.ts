export interface DisplayPref {
  target: "grams" | "oz" | "cups_tbsp";
  decimals?: number;
}

export function gramsToDisplay(grams: number, pref: DisplayPref): string {
  const d = pref.decimals ?? 2;
  if (pref.target === "grams") return `${Math.round(grams)} g`;
  if (pref.target === "oz") return `${(grams / 28.3495).toFixed(d)} oz`;
  // Heuristic for flour-like ingredients
  const cups = grams / 120;
  if (cups >= 1) return `${+cups.toFixed(d)} cup${cups>=1.5?"s":""}`;
  const tbsp = grams / 7.5;
  return `${+tbsp.toFixed(d)} tbsp`;
}
