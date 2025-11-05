"use client";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { appState } from "@/src/state/app";
import { gramsToDisplay } from "@/src/core/display";
import { Card } from "@/src/components/Card";
import NutritionLabel from "@/src/components/NutritionLabel";
import SecondaryButton from "@/src/components/SecondaryButton";

export default function ConvertResultPage() {
  const router = useRouter();
  const snap = useSnapshot(appState);

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px 16px 100px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#0F172A",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {snap.parsed?.title || "Converted Recipe"}
        </h1>
        <div
          style={{
            display: "inline-flex",
            borderRadius: "24px",
            background: "#FFFFFF",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <SecondaryButton onClick={() => router.push("/convert/input")} style={{ fontSize: "14px" }}>
            Back
          </SecondaryButton>
        </div>
      </div>

      {/* Converted Ingredients Card */}
      {snap.scaled && (
        <div style={{ marginBottom: "20px" }}>
          <Card title="Converted Ingredients">
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {snap.scaled.items.map((it, i) => (
                <li key={i} style={{ fontSize: "15px", color: "#0F172A", lineHeight: "1.6" }}>
                  {it.displayName}: {gramsToDisplay(it.grams, { target: snap.targetUnit, decimals: snap.decimals })}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {/* Allergens Card */}
      {snap.allergens?.length ? (
        <div style={{ marginBottom: "20px" }}>
          <Card title="Allergens">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {snap.allergens.map((a, i) => (
                <span
                  key={i}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "20px",
                    background: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
                    fontSize: "14px",
                    color: "#0F172A",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {a.name} {a.level === "Certain" ? "✅" : "⚠️"}
                </span>
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      {/* Nutrition Facts Card */}
      {snap.nutritionTotals && snap.nutritionPerServing && (
        <div style={{ marginBottom: "24px" }}>
          <Card>
            <div
              style={{
                borderRadius: "16px",
                border: "2px solid #0F172A",
                padding: "16px",
                background: "#FFFFFF",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
              }}
            >
              <NutritionLabel
                totals={{
                  calories: Math.round(snap.nutritionTotals.kcal),
                  protein: `${snap.nutritionTotals.protein_g.toFixed(1)}g`,
                  carbs: `${snap.nutritionTotals.carbs_g.toFixed(1)}g`,
                  fat: `${snap.nutritionTotals.fat_g.toFixed(1)}g`,
                }}
                perServing={{
                  calories: Math.round(snap.nutritionPerServing.kcal),
                  protein: `${snap.nutritionPerServing.protein_g.toFixed(1)}g`,
                  carbs: `${snap.nutritionPerServing.carbs_g.toFixed(1)}g`,
                  fat: `${snap.nutritionPerServing.fat_g.toFixed(1)}g`,
                }}
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
