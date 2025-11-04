export async function searchOFF(query: string) {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json = await res.json();
  return json?.products || [];
}
