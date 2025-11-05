"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/src/components/Card"
import NutritionLabel from "@/src/components/NutritionLabel"
import SecondaryButton from "@/src/components/SecondaryButton"

export default function RecipeResultPage() {
  const router = useRouter()

  const recipeTitle = "Classic Pancakes (Adjusted)"
  const convertedIngredients = ["340g all-purpose flour", "45g sugar", "227g milk", "57g egg", "5ml vanilla extract"]

  const allergens = [
    { name: "milk", certain: true },
    { name: "eggs", certain: true },
    { name: "gluten", possible: true },
  ]

  const nutritionData = {
    totals: { calories: 2400, protein: "48g", carbs: "320g", fat: "96g" },
    perServing: { calories: 300, protein: "6g", carbs: "40g", fat: "12g" },
  }

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
          {recipeTitle}
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
            {convertedIngredients.map((ingredient, idx) => (
              <li key={idx} style={{ fontSize: "15px", color: "#0F172A", lineHeight: "1.6" }}>
                {ingredient}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Allergens Card */}
      <div style={{ marginBottom: "20px" }}>
        <Card title="Allergens">
          {allergens.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#6B7280" }}>No allergens detected.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {allergens.map((allergen, idx) => (
                <span
                  key={idx}
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
                  {allergen.name} {allergen.certain ? "✅" : "⚠️"}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Nutrition Facts Card */}
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
            <NutritionLabel totals={nutritionData.totals} perServing={nutritionData.perServing} />
          </div>
        </Card>
      </div>
    </div>
  )
}
