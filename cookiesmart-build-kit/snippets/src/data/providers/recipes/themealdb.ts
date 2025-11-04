
const KEY = process.env.THEMEALDB_API_KEY || "1";
export async function searchMeals(query: string) {
  const url = `https://www.themealdb.com/api/json/v1/${KEY}/search.php?s=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json = await res.json();
  return json?.meals || [];
}
