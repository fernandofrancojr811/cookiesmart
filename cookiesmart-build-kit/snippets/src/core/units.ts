
export const FRACTION_RE = /(\d+)\s+(\d+)\/(\d+)/;

const FRAC_MAP: Record<string, number> = {
  "1/8": 0.125, "1/6": 1/6, "1/5": 0.2, "1/4": 0.25, "1/3": 1/3,
  "1/2": 0.5, "2/3": 2/3, "3/4": 0.75
};

export function toNumber(s: string): number {
  const t = s.trim();
  if (FRAC_MAP[t] != null) return FRAC_MAP[t];
  if (FRACTION_RE.test(t)) {
    const m = t.match(FRACTION_RE)!;
    const whole = parseFloat(m[1]);
    const num = parseFloat(m[2]);
    const den = parseFloat(m[3]);
    return whole + (num/den);
  }
  if (/^\d+\s+\d+\/\d+$/.test(t)) {
    const [whole, frac] = t.split(/\s+/);
    const [num, den] = frac.split("/").map(Number);
    return parseFloat(whole) + (num/den);
  }
  if (/^\d+\/\d+$/.test(t)) {
    const [num, den] = t.split("/").map(Number);
    return num/den;
  }
  const n = Number(t);
  return isFinite(n) ? n : 0;
}

export function normalizeUnit(u: string): string {
  const s = u.toLowerCase();
  const map: Record<string, string> = {
    teaspoons: "tsp", teaspoon: "tsp", tsp: "tsp", t: "tsp",
    tablespoons: "tbsp", tablespoon: "tbsp", tbsp: "tbsp", T: "tbsp",
    cup: "cup", cups: "cup",
    ounce: "oz", ounces: "oz", oz: "oz",
    pound: "lb", pounds: "lb", lb: "lb", lbs: "lb",
    gram: "g", grams: "g", g: "g",
    kilogram: "kg", kilograms: "kg", kg: "kg",
    milliliter: "ml", milliliters: "ml", ml: "ml",
    liter: "l", liters: "l", l: "l",
    "fl oz": "fl_oz", floz: "fl_oz",
  };
  return map[s] || s;
}

export const VOLUME_TO_ML: Record<string, number> = {
  tsp: 4.92892,
  tbsp: 14.7868,
  cup: 240,
  fl_oz: 29.5735,
  l: 1000,
  ml: 1,
};

export const MASS_TO_G: Record<string, number> = {
  g: 1,
  kg: 1000,
  mg: 0.001,
  oz: 28.3495,
  lb: 453.592,
};
