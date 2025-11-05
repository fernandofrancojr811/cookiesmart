"use client"

import { useRouter } from "next/navigation"
import { type CSSProperties, useState } from "react"
import PrimaryButton from "@/src/components/PrimaryButton"
import SecondaryButton from "@/src/components/SecondaryButton"
import AllergenBanner from "@/src/components/AllergenBanner"
import NutritionLabel from "@/src/components/NutritionLabel"
import BottomNav from "@/src/components/BottomNav"

export default function ConvertPage() {
  const router = useRouter()
  const [originalServings, setOriginalServings] = useState(8)
  const [currentServings, setCurrentServings] = useState(8)
  const [targetUnit, setTargetUnit] = useState("grams")

  const containerStyle: CSSProperties = {
    maxWidth: "880px",
    margin: "0 auto",
    padding: "40px 20px 100px",
    minHeight: "100vh",
  }

  const headerStyle: CSSProperties = {
    fontSize: "32px",
    fontWeight: 700,
    color: "#0F172A",
    marginBottom: "32px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  }

  const layoutStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
    marginBottom: "32px",
  }

  const columnStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }

  const labelStyle: CSSProperties = {
    fontSize: "14px",
    fontWeight: 600,
    color: "#0F172A",
    marginBottom: "8px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  }

  const textareaStyle: CSSProperties = {
    width: "100%",
    minHeight: "300px",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    fontFamily: "ui-monospace, monospace",
    resize: "vertical",
    color: "#1e293b", // Made textarea text darker for better readability
  }

  const selectStyle: CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
    background: "#FFFFFF",
  }

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  }

  const servingsRowStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  }

  const stickyPanelStyle: CSSProperties = {
    position: "sticky",
    top: "20px",
    background: "#F8FAFC",
    padding: "24px",
    borderRadius: "24px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
  }

  const backButtonContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginTop: "32px",
  }

  const handleConvert = () => {
    console.log("Convert clicked", {
      targetUnit,
      originalServings,
      currentServings,
    })
  }

  // Sample data for allergens and nutrition
  const sampleAllergens = [
    { name: "Gluten", possible: false },
    { name: "Dairy", possible: false },
    { name: "Eggs", possible: true },
    { name: "Nuts", possible: true },
  ]

  const sampleNutrition = {
    totals: {
      calories: 2400,
      protein: "48g",
      carbs: "320g",
      fat: "96g",
    },
    perServing: {
      calories: 300,
      protein: "6g",
      carbs: "40g",
      fat: "12g",
    },
  }

  return (
    <>
      <div style={containerStyle}>
        <h1 style={headerStyle}>Recipe Conversion</h1>

        <div style={layoutStyle}>
          {/* Left column - Ingredient input */}
          <div style={columnStyle}>
            <div>
              <label style={labelStyle}>Ingredient Lines</label>
              <textarea
                style={textareaStyle}
                placeholder="2 cups all-purpose flour&#10;1 cup sugar&#10;1/2 cup butter&#10;3 eggs&#10;1 tsp vanilla extract&#10;..."
              />
            </div>
          </div>

          {/* Right column - Controls */}
          <div style={columnStyle}>
            <div style={stickyPanelStyle}>
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Target Units</label>
                <select style={selectStyle} value={targetUnit} onChange={(e) => setTargetUnit(e.target.value)}>
                  <option value="grams">Grams</option>
                  <option value="ounces">Ounces</option>
                  <option value="us-volume">US Volume</option>
                  <option value="metric-volume">Metric Volume</option>
                </select>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Servings</label>
                <div style={servingsRowStyle}>
                  <div>
                    <div style={{ ...labelStyle, fontSize: "12px", marginBottom: "4px" }}>Original</div>
                    <input
                      type="number"
                      style={inputStyle}
                      value={originalServings}
                      onChange={(e) => setOriginalServings(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                  <div>
                    <div style={{ ...labelStyle, fontSize: "12px", marginBottom: "4px" }}>Current</div>
                    <input
                      type="number"
                      style={inputStyle}
                      value={currentServings}
                      onChange={(e) => setCurrentServings(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <PrimaryButton onClick={handleConvert} style={{ width: "100%" }}>
                Normalize & Convert
              </PrimaryButton>

              <AllergenBanner chips={sampleAllergens} />
              <NutritionLabel totals={sampleNutrition.totals} perServing={sampleNutrition.perServing} />
            </div>
          </div>
        </div>

        <div style={backButtonContainerStyle}>
          <SecondaryButton onClick={() => router.push("/menu")}>Back to Menu</SecondaryButton>
        </div>
      </div>
      <BottomNav current="home" />
    </>
  )
}
