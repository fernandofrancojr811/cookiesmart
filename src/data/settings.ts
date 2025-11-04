import { db, type Settings } from "./db";

export async function getSettings(): Promise<Settings> {
  const s = await db.settings.get("app");
  if (s) return s;
  const def: Settings = { id: "app", unit: "grams", decimals: 1, theme: "pinkblue", pro: false };
  await db.settings.put(def);
  return def;
}
export async function updateSettings(patch: Partial<Settings>) {
  const current = await getSettings();
  const next = { ...current, ...patch };
  await db.settings.put(next);
  return next;
}
