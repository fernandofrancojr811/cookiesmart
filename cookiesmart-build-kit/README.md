# CookieSmart Build Kit (Cursor-Ready)

This folder contains **step-by-step instructions** and **copy‑paste code** to wire the CookieSmart UI you provided into a fully working app.
It is tailored to your preferences:

- **Next.js 14 + React 18** (safest with shadcn/v0)
- **Scaffold for larger nutrition & recipe APIs** (free options suggested)
- **Allergen certainty levels** (Certain vs. Possible)
- **Best UX**: dedicated Library page + modal access where helpful
- **Supabase added now** (env-gated; optional tab in Library)
- **Monetization gating**: practical now, extensible later
- **iOS bridge**: easiest UX (UMD/IIFE bundle for JavaScriptCore)

> Paste this README into Cursor or follow it step-by-step. All referenced files are included under `snippets/`.

---

## 0) Baseline & Tooling

1. **Ensure Next.js 14 + React 18** in your web app:
   ```bash
   pnpm add next@14 react@18 react-dom@18
   ```

2. **Install dependencies** (core + state + storage + tests + bundling):
   ```bash
   pnpm add zod valtio dexie idb
   pnpm add -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom @types/jest
   pnpm add -D playwright @playwright/test
   pnpm add -D tsup
   pnpm add @supabase/supabase-js
   ```

3. **Unify globals** (keep `app/globals.css` as the single global CSS).

4. **Copy files from `snippets/` into your project at the same relative paths.**
   - If a path doesn’t exist, create it.
   - Overwrite placeholder components only where noted.

5. **Env file**: duplicate `.env.example` into `.env.local` and fill values you have.
   - It’s safe to leave some empty; the app will fallback to local-only behavior.

---

## 1) Core Library (TypeScript, client-side, pure functions)

Create the following under `src/core/`:

- `types.ts`, `units.ts`, `densities.ts`, `nutrition.ts`, `allergens.ts`, `parser.ts`, `normalize.ts`, `scale.ts`, `display.ts`, `index.ts`

These power: parsing, unit normalization (to **grams**), scaling, nutrition, allergens, and display conversion.

> **Copy from**: `snippets/src/core/*`

---

## 2) Local-First Storage

Create IndexedDB via Dexie:

- `src/data/db.ts` — local recipe store
- `src/data/settings.ts` — local app settings (unit system, rounding, theme, pro flag)

> **Copy from**: `snippets/src/data/*`

---

## 3) Cloud Sync (Supabase)

Added now, but optional at runtime (env-gated).

- `src/data/cloud.ts` — Supabase clients for login-less public user (RLS) or authenticated later
- `supabase/tables.sql` — tables and RLS policies
- Add `.env.local` with:
  - `NEXT_PUBLIC_SUPABASE_URL=...`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`

> **Copy from**: `snippets/src/data/cloud.ts` and `supabase/tables.sql`

**UX**: Library has **Local** and **Cloud** tabs. Only show Cloud when env vars are present.

---

## 4) Global App State & Recompute Pipeline

- `src/state/app.ts` holds reactive state (Valtio).
- `src/state/recompute.ts` centralizes pipeline:
  - parse → normalize → scale → totals → per‑serving → allergens

> **Copy from**: `snippets/src/state/*`

Use `recompute()` anywhere inputs change (textarea, unit, servings, etc.).

---

## 5) UI Wiring (Conversion, Import, Library, Settings)

- **Conversion** (`app/convert/page.tsx`) — connect textarea, servings, unit select, results list, Nutrition, AllergenBanner, Save/Load.
- **Import** (`app/import/page.tsx`) — paste, upload `.txt`, choose from Library.
- **Library** (`app/library/page.tsx`) — dedicated page with search, list, tabs: **Local/Cloud**.
- **Settings** (`app/settings/page.tsx`) — default unit system, rounding, theme, Supabase status.
- **BottomNav** links to `/menu`, `/convert`, `/library`, `/settings`.

> **Copy from**: `snippets/app/*` and update your components to import `COLORS`, `RADII`, `SHADOW`.

---

## 6) Theme & Polish (Apple/iOS feel)

- `src/ui/theme.ts` centralizes colors, radii, shadow.
- Update `AllergenBanner`, `NutritionLabel`, `BottomNav`, `CookieLoader` to use theme and bubbly visuals.

> **Copy from**: `snippets/src/ui/theme.ts` and `snippets/src/components/*`

---

## 7) External Data (Free APIs, scaffold only)

We scaffold providers with safe fallbacks:
- **Nutrition** (preferred free): **USDA FoodData Central (FDC)** — free API key
  - https://fdc.nal.usda.gov/
- **Alternate**: **Open Food Facts** (community, no key) — https://world.openfoodfacts.org/data
- **Optional**: **Nutritionix** (has free tier) — https://developer.nutritionix.com/
- **Recipes** (free): **TheMealDB** (open, free key) — https://www.themealdb.com/api.php  
  (Alternative paid/limited: Spoonacular/Edamam — can add later)

Files:
- `src/data/providers/nutrition/usda.ts`
- `src/data/providers/nutrition/nutritionix.ts`
- `src/data/providers/nutrition/openfoodfacts.ts`
- `src/data/providers/recipes/themealdb.ts`
- `src/data/providers/index.ts` (provider selection)

> **Copy from**: `snippets/src/data/providers/*`

Set env:
```
USDA_API_KEY=
NUTRITIONIX_APP_ID=
NUTRITIONIX_APP_KEY=
THEMEALDB_API_KEY=1
```

The app prefers USDA → Nutritionix → OpenFoodFacts.

---

## 8) Tests

- **Vitest** for core (`src/core/*.test.ts`).
- **Testing Library** for Convert screen.
- **Playwright** single happy-path E2E.

> **Copy from**: `snippets/tests/*`

Run:
```bash
pnpm test
pnpm exec playwright install
pnpm run e2e
```

---

## 9) iOS Bridge (easiest UX)

Bundle the core as a UMD/IIFE attach:
- `tsup.config.ts` in project root
- Entry at `src/core/index.ts`
- Produces `dist/core.iife.js` with `window.CookieSmartCore`

> **Copy from**: `snippets/tsup.config.ts`

Use in SwiftUI with JavaScriptCore by loading the file and calling exported functions.

---

## 10) Monetization (now & future)

- Gate **Cloud Sync** and **Custom Densities** behind a “Pro” flag in settings (local only for now).
- Future: replace flag with real checkout + entitlement.

> See toggles in `src/data/settings.ts` and checks in Library/Settings pages.

---

## 11) Deployment

- **Vercel** (web): connect repo, `NEXT_TELEMETRY_DISABLED=1`.
- **TestFlight**: after iOS shell loads `dist/core.iife.js`, wire basic screens.

---

## Folder Guide

- `snippets/` — all code to copy into your project
- `supabase/` — SQL for tables + RLS
- `.env.example` — environment variables (copy to `.env.local`)

---

## Quick Start TL;DR

1) Install deps → 2) Copy `snippets/` files into the project → 3) Set `.env.local` →
4) Wire `app/convert`, `app/import`, `app/library`, `app/settings` as provided →
5) Run and validate.

---

## Notes

- All math uses **grams** internally. Display uses formatters only.
- Allergen detector marks **Certain** (exact-key ingredients) vs **Possible** (substring/NLP heuristic).
- Cloud sync is optional — app is **local-first** by design.

Enjoy ✨
