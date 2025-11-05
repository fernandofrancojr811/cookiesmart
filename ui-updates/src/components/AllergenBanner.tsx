"use client"

import type { CSSProperties } from "react"

interface AllergenChip {
  name: string
  possible?: boolean
}

interface AllergenBannerProps {
  chips: AllergenChip[]
}

export default function AllergenBanner({ chips }: AllergenBannerProps) {
  const containerStyle: CSSProperties = {
    background: "#F8FAFC",
    borderRadius: "12px",
    padding: "16px",
    marginTop: "16px",
  }

  const chipsContainerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "12px",
  }

  const chipStyle = (possible: boolean): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#FFFFFF",
    border: `1px solid ${possible ? "#FFA500" : "#22C55E"}`,
    borderRadius: "20px",
    padding: "6px 12px",
    fontSize: "14px",
    color: "#0F172A",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  })

  const warningStyle: CSSProperties = {
    fontSize: "12px",
    color: "#64748b",
    fontStyle: "italic",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  }

  return (
    <div style={containerStyle}>
      <div style={chipsContainerStyle}>
        {chips.map((chip, index) => (
          <div key={index} style={chipStyle(chip.possible || false)}>
            <span>{chip.possible ? "⚠️" : "✅"}</span>
            <span>{chip.name}</span>
          </div>
        ))}
      </div>
      <div style={warningStyle}>Allergen list is generated automatically and may be incomplete.</div>
    </div>
  )
}
