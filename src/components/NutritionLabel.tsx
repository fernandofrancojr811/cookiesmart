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
    background: "#FFFFFF",
    border: "2px solid #0F172A",
    borderRadius: "12px",
    padding: "16px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
    marginTop: "16px",
  }

  const titleStyle = {
    fontSize: "18px",
    fontWeight: 700,
    color: "#0F172A",
    marginBottom: "12px",
    borderBottom: "4px solid #0F172A",
    paddingBottom: "4px",
  }

  const sectionStyle = {
    marginBottom: "16px",
  }

  const sectionTitleStyle = {
    fontSize: "14px",
    fontWeight: 600,
    color: "#0F172A",
    marginBottom: "8px",
  }

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#0F172A",
    padding: "4px 0",
    borderBottom: "1px solid #e5e7eb",
  }

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Nutrition Facts</div>

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Total Recipe</div>
        <div style={rowStyle}>
          <span>Calories</span>
          <span style={{ fontWeight: 600 }}>{totals.calories || 0}</span>
        </div>
        <div style={rowStyle}>
          <span>Protein</span>
          <span>{totals.protein || "0g"}</span>
        </div>
        <div style={rowStyle}>
          <span>Carbohydrates</span>
          <span>{totals.carbs || "0g"}</span>
        </div>
        <div style={rowStyle}>
          <span>Fat</span>
          <span>{totals.fat || "0g"}</span>
        </div>
      </div>

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
          <span>Carbohydrates</span>
          <span>{perServing.carbs || "0g"}</span>
        </div>
        <div style={rowStyle}>
          <span>Fat</span>
          <span>{perServing.fat || "0g"}</span>
        </div>
      </div>
    </div>
  )
}
