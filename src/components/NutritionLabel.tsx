"use client"

import { COLORS, RADII } from "@/src/ui/theme"

interface NutritionData {
  calories?: number
  protein?: string
  carbs?: string
  fat?: string
}

interface NutritionLabelProps {
  totals: NutritionData
  perServing: NutritionData
}

export default function NutritionLabel({ totals, perServing }: NutritionLabelProps) {
  const containerStyle = {
    background: COLORS.white,
    borderRadius: `${RADII.lg}px`,
    padding: "16px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
    marginTop: "16px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
  }

  const titleStyle = {
    fontSize: "18px",
    fontWeight: 700,
    color: COLORS.ink,
    marginBottom: "16px",
    textAlign: "center" as const,
  }

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  }

  const sectionStyle = {
    padding: "12px",
    backgroundColor: "#f8fafc",
    borderRadius: `${RADII.sm}px`,
  }

  const sectionTitleStyle = {
    fontSize: "14px",
    fontWeight: 600,
    color: COLORS.ink,
    marginBottom: "8px",
    textAlign: "center" as const,
  }

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: COLORS.ink,
    padding: "4px 0",
    borderBottom: "1px solid #e5e7eb",
  }

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Nutrition Facts</div>
      
      <div style={gridStyle}>
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Per Serving</div>
          <div style={rowStyle}>
            <span>Calories</span>
            <span style={{ fontWeight: 600 }}>{perServing.calories || 0}</span>
          </div>
          <div style={rowStyle}>
            <span>Protein</span>
            <span>{perServing.protein || "0g"}</span>
          </div>
          <div style={rowStyle}>
            <span>Carbs</span>
            <span>{perServing.carbs || "0g"}</span>
          </div>
          <div style={rowStyle}>
            <span>Fat</span>
            <span>{perServing.fat || "0g"}</span>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Whole Recipe</div>
          <div style={rowStyle}>
            <span>Calories</span>
            <span style={{ fontWeight: 600 }}>{totals.calories || 0}</span>
          </div>
          <div style={rowStyle}>
            <span>Protein</span>
            <span>{totals.protein || "0g"}</span>
          </div>
          <div style={rowStyle}>
            <span>Carbs</span>
            <span>{totals.carbs || "0g"}</span>
          </div>
          <div style={rowStyle}>
            <span>Fat</span>
            <span>{totals.fat || "0g"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
