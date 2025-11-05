# CookieSmart Update Kit (Cursor-Ready)

This kit contains **instructions + code snippets** to implement your requested updates on top of the existing build.
Give this entire folder to Cursor and follow `Step-by-step` below. Every file path is relative to your Next.js app.

## What this update includes
1. **Recipe Title Recognizer** (auto + manual override on input page)
2. **Consistent Back Buttons** (shared `BackButton` component)
3. **New Nutrition Facts UI** (single bordered panel like reference Image 2)
4. **Cookie Loader Tweaks** (more chips; move loader to Menu heading)
5. **Split Convert Flow** (two pages: `/convert/input` → `/convert/result` with convert animation)
6. **Online Recipes Integration** (TheMealDB search + import into input page)

---

## Step-by-step (apply in order)

### 0) Prereqs
- You’ve already installed dependencies from the previous kit.
- Ensure `cookiesmart-build-kit` core/state files are present.
- This kit does not change env vars, but online recipes use TheMealDB (free key defaults to `1`).

### 1) Title Recognizer
**Edit:** `src/core/parser.ts`  
Replace your `parseFreeform` with the version in `snippets/src/core/parser.ts` (adds title detection).  
This will set `parsed.meta.title` automatically when the first line looks like a title.

### 2) Split Convert Flow
**Add pages:**
- `app/convert/input/page.tsx`
- `app/convert/result/page.tsx`

Copy both files from `snippets/app/convert/input/page.tsx` and `snippets/app/convert/result/page.tsx`.
If you still have a single `app/convert/page.tsx`, delete it or route it to `/convert/input`.

### 3) Back Buttons
**Add:** `src/components/BackButton.tsx` (shared style) from `snippets/src/components/BackButton.tsx`.  
Use this component wherever you have “Back to Intro” or “Back to Menu” links.

### 4) Nutrition Facts UI
**Add:** `src/components/NutritionFactsPanel.tsx` from `snippets/src/components/NutritionFactsPanel.tsx`.  
Update `/convert/result` page to use `<NutritionFacts />` (already wired in the snippet).  
Remove older dual-card nutrition UI usages on result page.

### 5) Cookie Loader Tweaks
**Edit:** `src/components/CookieLoader.tsx` with `snippets/src/components/CookieLoader.tsx` (12 chips, smoother motion).  
**Edit:** `app/menu/page.tsx` with the changes shown in `snippets/app/menu/page.patch.txt`:
- Remove loader under the “Calculate Recipe Conversions” button
- Append `<CookieLoader />` inline to the heading “What would you like to do today?”

### 6) Online Recipes Integration
**Add helper:** `src/data/recipes-online.ts` from `snippets/src/data/recipes-online.ts`.  
**Edit:** `app/import/page.tsx` to add the online search section. Use `snippets/app/import/page.patch.txt` as a guide.

### 7) Routing Touch-ups
- Ensure the “Calculate Recipe Conversions” button points to `/convert/input`.
- Ensure “Back to Recipe Input” on result page routes to `/convert/input`.

### 8) Smoke Test
- Input page recognizes a plain-text title on the first line and populates the “Recipe Title” input.
- Convert → shows quick spinner delay, navigates to result page.
- Result page shows new Nutrition Facts panel (border, rule, sections).
- Menu page shows the cookie loader inline on the heading; no loader under the button.
- Import page can search TheMealDB and import into the input page.

---

## Files in this kit
- `snippets/src/core/parser.ts` — title recognition
- `snippets/app/convert/input/page.tsx` — new Input page
- `snippets/app/convert/result/page.tsx` — new Result page (uses new nutrition panel + chips)
- `snippets/src/components/BackButton.tsx` — shared back button
- `snippets/src/components/NutritionFactsPanel.tsx` — Image-2 style UI
- `snippets/src/components/CookieLoader.tsx` — more chips, smoother motion
- `snippets/app/menu/page.patch.txt` — patch instructions to append loader to heading
- `snippets/src/data/recipes-online.ts` — TheMealDB integration
- `snippets/app/import/page.patch.txt` — patch instructions to add online recipe search/import

> Keep your theme/colors consistent with your current UI (pink/blue Apple style).
