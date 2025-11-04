
export type UnitSystem = "metric" | "imperial" | "cups_tbsp" | "custom";

export interface IngredientToken {
  raw: string;
  qty: number;
  unit: string;
  name: string;
  notes?: string;
}

export interface ParsedRecipe {
  title?: string;
  description?: string;
  servingsOriginal: number;
  ingredients: IngredientToken[];
  steps?: string[];
}

export interface DensityMapEntry {
  gPerMl?: number;
  unitToGram?: Record<string, number>;
}

export type DensityMap = Record<string, DensityMapEntry>;

export interface NormalizedIngredient {
  name: string;        // canonical key
  grams: number;       // base amount
  displayName: string; // friendly
  source: IngredientToken;
}

export interface NormalizedRecipe {
  servingsOriginal: number;
  items: NormalizedIngredient[];
  meta?: { title?: string; description?: string };
}

export interface Nutrition100g {
  kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  [k: string]: number;
}

export type NutritionTable = Record<string, Nutrition100g>;

export interface NutritionTotals {
  kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface AllergenHit {
  name: string;    // "milk"
  level: "Certain" | "Possible";
  sourceTerms: string[];
}

export interface AllergenReport {
  hits: AllergenHit[];
}
