const APP_ID = process.env.NUTRITIONIX_APP_ID;
const APP_KEY = process.env.NUTRITIONIX_APP_KEY;

export async function searchInstant(query: string) {
  if (!APP_ID || !APP_KEY) return [];
  const res = await fetch("https://trackapi.nutritionix.com/v2/search/instant?query=" + encodeURIComponent(query), {
    headers: { "x-app-id": APP_ID, "x-app-key": APP_KEY }
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json;
}
