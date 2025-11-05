"use client";
import { useSnapshot } from "valtio";
import { appState } from "@/src/state/app";
import { gramsToDisplay } from "@/src/core/display";
import NutritionFacts from "@/src/components/NutritionFactsPanel";
import BackButton from "@/src/components/BackButton";

export default function ConvertResultPage() {
  const snap = useSnapshot(appState);
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {snap.parsed?.meta?.title || "New Recipe after conversions"}
        </h1>
        <BackButton href="/convert/input">Back to Recipe Input</BackButton>
      </div>

      {snap.scaled && (
        <div className="rounded-lg p-4 bg-white shadow">
          <h2 className="font-medium mb-2">Converted Ingredients</h2>
          <ul className="list-disc pl-6 space-y-1">
            {snap.scaled.items.map((it, i) => (
              <li key={i}>
                {it.displayName}: {gramsToDisplay(it.grams, { target: snap.targetUnit, decimals: snap.decimals })}
              </li>
            ))}
          </ul>
        </div>
      )}

      {snap.allergens?.length ? (
        <div className="rounded-lg p-3 bg-pink-100">
          <div className="font-semibold mb-1">Allergens</div>
          <div className="flex flex-wrap gap-2">
            {snap.allergens.map((a, i) => (
              <span key={i} className="px-2 py-1 rounded-full bg-white shadow text-sm">
                {a.name} {a.level === "Certain" ? "✅" : "⚠️"}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {snap.nutritionTotals && snap.nutritionPerServing && (
        <NutritionFacts
          totals={{
            calories: Math.round(snap.nutritionTotals.kcal),
            protein: `${snap.nutritionTotals.protein_g.toFixed(1)}g`,
            carbs: `${snap.nutritionTotals.carbs_g.toFixed(1)}g`,
            fat: `${snap.nutritionTotals.fat_g.toFixed(1)}g`,
          }}
          per={{
            calories: Math.round(snap.nutritionPerServing.kcal),
            protein: `${snap.nutritionPerServing.protein_g.toFixed(1)}g`,
            carbs: `${snap.nutritionPerServing.carbs_g.toFixed(1)}g`,
            fat: `${snap.nutritionPerServing.fat_g.toFixed(1)}g`,
          }}
        />
      )}
    </div>
  );
}
