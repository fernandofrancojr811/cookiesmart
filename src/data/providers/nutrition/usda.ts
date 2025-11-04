const BASE = "https://api.nal.usda.gov/fdc/v1";

export async function searchFoods(query: string) {
  const key = process.env.USDA_API_KEY;
  if (!key) return [];
  const url = `${BASE}/foods/search?api_key=${key}&query=${encodeURIComponent(query)}&pageSize=10`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json = await res.json();
  return json?.foods || [];
}
