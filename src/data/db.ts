import Dexie, { Table } from "dexie";

export interface SavedRecipe {
  id?: string;
  title: string;
  description?: string;
  servingsOriginal: number;
  sourceText: string;
  createdAt: number;
  updatedAt: number;
}

export interface Settings {
  id: string; // singleton "app"
  unit: "grams"|"oz"|"cups_tbsp";
  decimals: number;
  theme: "pinkblue";
  pro: boolean;
}

class CookieSmartDB extends Dexie {
  recipes!: Table<SavedRecipe, string>;
  settings!: Table<Settings, string>;
  constructor() {
    super("cookiesmart");
    this.version(1).stores({
      recipes: "id, title, updatedAt",
      settings: "id",
    });
  }
}
export const db = new CookieSmartDB();
