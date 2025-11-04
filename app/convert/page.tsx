"use client"

import { useRouter } from "next/navigation"
import { type CSSProperties, useState } from "react"
import { useSnapshot } from "valtio"
import { appState } from "@/src/state/app"
import { recompute } from "@/src/state/recompute"
import { gramsToDisplay } from "@/src/core/display"
import PrimaryButton from "@/src/components/PrimaryButton"
import SecondaryButton from "@/src/components/SecondaryButton"
import AllergenBanner from "@/src/components/AllergenBanner"
import NutritionLabel from "@/src/components/NutritionLabel"
import BottomNav from "@/src/components/BottomNav"

export default function ConvertPage() {
  const router = useRouter()
  const snap = useSnapshot(appState)

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

  const handleClear = () => {
    appState.rawText = "";
    recompute();
  }

  // Convert nutrition data for display
  const nutritionData = snap.nutritionTotals && snap.nutritionPerServing ? {
    totals: {
      calories: Math.round(snap.nutritionTotals.kcal),
      protein: `${snap.nutritionTotals.protein_g.toFixed(1)}g`,
      carbs: `${snap.nutritionTotals.carbs_g.toFixed(1)}g`,
      fat: `${snap.nutritionTotals.fat_g.toFixed(1)}g`,
    },
    perServing: {
      calories: Math.round(snap.nutritionPerServing.kcal),
      protein: `${snap.nutritionPerServing.protein_g.toFixed(1)}g`,
      carbs: `${snap.nutritionPerServing.carbs_g.toFixed(1)}g`,
      fat: `${snap.nutritionPerServing.fat_g.toFixed(1)}g`,
    },
  } : null

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
                value={snap.rawText}
                onChange={(e) => {
                  appState.rawText = e.target.value;
                  recompute();
                }}
              />
            </div>
          </div>

          {/* Right column - Controls */}
          <div style={columnStyle}>
            <div style={stickyPanelStyle}>
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Target Units</label>
                <select style={selectStyle} value={snap.targetUnit} onChange={(e) => {
                  appState.targetUnit = e.target.value as any;
                }}>
                  <option value="grams">Grams</option>
                  <option value="oz">Ounces</option>
                  <option value="cups_tbsp">Cups/Tbsp</option>
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
                      value={snap.servingsOriginal}
                      onChange={(e) => {
                        appState.servingsOriginal = Number(e.target.value) || 1;
                        recompute();
                      }}
                      min="1"
                    />
                  </div>
                  <div>
                    <div style={{ ...labelStyle, fontSize: "12px", marginBottom: "4px" }}>Current</div>
                    <input
                      type="number"
                      style={inputStyle}
                      value={snap.currentServings}
                      onChange={(e) => {
                        appState.currentServings = Number(e.target.value) || 1;
                        recompute();
                      }}
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <PrimaryButton onClick={handleClear} style={{ width: "100%" }}>
                Clear All
              </PrimaryButton>

              {snap.scaled && (
                <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontWeight: 600, marginBottom: "8px", color: "#0F172A" }}>Converted Ingredients</div>
                  <div style={{ fontSize: "14px", lineHeight: "1.4" }}>
                    {snap.scaled.items.map((item, idx) => (
                      <div key={idx} style={{ marginBottom: "4px" }}>
                        {item.displayName}: {gramsToDisplay(item.grams, { target: snap.targetUnit, decimals: snap.decimals })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {snap.allergens.length > 0 && (
                <AllergenBanner chips={snap.allergens} />
              )}
              
              {nutritionData && (
                <NutritionLabel totals={nutritionData.totals} perServing={nutritionData.perServing} />
              )}
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
