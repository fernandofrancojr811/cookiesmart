import { searchMeals } from "@/src/data/providers/recipes/themealdb";
import { db } from "@/src/data/db";
import { appState } from "@/src/state/app";
import { recompute } from "@/src/state/recompute";

export async function searchOnlineRecipes(q: string) {
  const meals = await searchMeals(q);
  return (meals || []).map((m:any) => ({
    id: m.idMeal,
    title: m.strMeal,
    area: m.strArea,
    category: m.strCategory,
    instructions: m.strInstructions,
    ingredients: extractIngredients(m),
  }));
}

function extractIngredients(m: any) {
  const lines: string[] = [];
  for (let i=1; i<=20; i++) {
    const ing = m[`strIngredient${i}`];
    const meas = m[`strMeasure${i}`];
    if (ing && ing.trim()) {
      const line = [meas, ing].filter(Boolean).join(" ").trim();
      lines.push(line);
    }
  }
  return lines.join("\n");
}

export async function importOnlineRecipe(r: any, router: any) {
  appState.rawText = r.ingredients;
  recompute();
  if (appState.parsed) appState.parsed.meta = { ...(appState.parsed.meta||{}), title: r.title };
  await db.recipes.put({
    id: r.id,
    title: r.title,
    sourceText: r.ingredients,
    description: r.instructions,
    servingsOriginal: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  router.push("/convert/input");
}
