import * as usda from "./nutrition/usda";
import * as nutritionix from "./nutrition/nutritionix";
import * as off from "./nutrition/openfoodfacts";
import * as themealdb from "./recipes/themealdb";

export const NutritionProviders = { usda, nutritionix, off };
export const RecipeProviders = { themealdb };
