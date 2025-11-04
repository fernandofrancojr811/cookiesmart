
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = (url && key) ? createClient(url, key) : null;

export async function cloudEnabled() {
  return !!supabase;
}

export async function listCloudRecipes() {
  if (!supabase) return [];
  const { data } = await supabase.from("recipes").select("*").order("updated_at", { ascending: false });
  return data || [];
}

export async function upsertCloudRecipe(rec: { id?: string; title: string; description?: string; servings_original: number; source_text: string; }) {
  if (!supabase) return null;
  const { data, error } = await supabase.from("recipes").upsert({
    id: rec.id, title: rec.title, description: rec.description,
    servings_original: rec.servings_original, source_text: rec.source_text
  }).select("*").single();
  if (error) throw error;
  return data;
}
