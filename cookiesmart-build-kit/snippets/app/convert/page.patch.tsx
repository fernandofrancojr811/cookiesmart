
// Pseudo-patch illustrating how to wire state & recompute:
/*
"use client";
import { useSnapshot } from "valtio";
import { appState } from "@/src/state/app";
import { recompute } from "@/src/state/recompute";
import { gramsToDisplay } from "@/src/core/display";

export default function ConvertPage() {
  const snap = useSnapshot(appState);

  return (
    <div className="p-4 space-y-4">
      <textarea
        className="w-full h-40 p-3 rounded-lg border"
        placeholder="Paste ingredients... e.g. '1 1/2 cups all-purpose flour'"
        value={snap.rawText}
        onChange={(e)=>{ appState.rawText = e.target.value; recompute(); }}
      />
      <div className="flex items-center gap-2">
        <label>Original Servings</label>
        <input type="number" className="border rounded p-2 w-20" value={snap.servingsOriginal} onChange={(e)=>{ appState.servingsOriginal = Number(e.target.value)||1; recompute(); }}/>
        <label>Current Servings</label>
        <input type="number" className="border rounded p-2 w-20" value={snap.currentServings} onChange={(e)=>{ appState.currentServings = Number(e.target.value)||1; recompute(); }}/>
        <label>Units</label>
        <select className="border rounded p-2" value={snap.targetUnit} onChange={(e)=>{ appState.targetUnit = e.target.value as any; }}>
          <option value="grams">Grams</option>
          <option value="oz">Ounces</option>
          <option value="cups_tbsp">Cups/Tbsp</option>
        </select>
      </div>

      {snap.scaled && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Converted Ingredients</h2>
          <ul className="list-disc pl-6">
            {snap.scaled.items.map((it, idx) => (
              <li key={idx}>
                {it.displayName}: {gramsToDisplay(it.grams, { target: snap.targetUnit, decimals: snap.decimals })}
              </li>
            ))}
          </ul>
        </div>
      )}

      {snap.nutritionTotals && snap.nutritionPerServing && (
        <div className="rounded-lg p-3 bg-white shadow">
          <div className="font-semibold mb-2">Nutrition</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-medium">Per Serving</div>
              <div>Calories: {Math.round(snap.nutritionPerServing.kcal)}</div>
              <div>Protein: {snap.nutritionPerServing.protein_g.toFixed(1)} g</div>
              <div>Carbs: {snap.nutritionPerServing.carbs_g.toFixed(1)} g</div>
              <div>Fat: {snap.nutritionPerServing.fat_g.toFixed(1)} g</div>
            </div>
            <div>
              <div className="font-medium">Whole Recipe</div>
              <div>Calories: {Math.round(snap.nutritionTotals.kcal)}</div>
              <div>Protein: {snap.nutritionTotals.protein_g.toFixed(1)} g</div>
              <div>Carbs: {snap.nutritionTotals.carbs_g.toFixed(1)} g</div>
              <div>Fat: {snap.nutritionTotals.fat_g.toFixed(1)} g</div>
            </div>
          </div>
        </div>
      )}

      {snap.allergens && (
        <div className="text-sm">
          <strong>Allergens:</strong>{" "}
          {snap.allergens.filter(a=>a.level).map(a=>`${a.name} (${a.level})`).join(", ") || "None detected"}
        </div>
      )}

      <div className="pt-4 flex gap-2">
        <button className="px-3 py-2 rounded bg-blue-600 text-white">Save to Library</button>
        <button className="px-3 py-2 rounded bg-gray-100">Load from Library</button>
        <button className="px-3 py-2 rounded bg-gray-100" onClick={()=>{ appState.rawText=""; recompute(); }}>Clear</button>
      </div>
    </div>
  );
}
*/
