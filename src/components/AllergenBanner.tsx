"use client"

import { COLORS, RADII, SHADOW } from "@/src/ui/theme"

interface AllergenChip {
  name: string
  level?: "Certain" | "Possible"
}

interface AllergenBannerProps {
  chips: AllergenChip[]
}

export default function AllergenBanner({ chips }: AllergenBannerProps) {
  const containerStyle = {
    background: COLORS.babyPink,
    borderRadius: `${RADII.md}px`,
    padding: "16px",
    marginTop: "16px",
    boxShadow: SHADOW,
  }

  const titleStyle = {
    fontWeight: 600,
    color: COLORS.ink,
    marginBottom: "8px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  }

  const chipsContainerStyle = {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
  }

  const chipStyle = {
    background: COLORS.white,
    borderRadius: "999px",
    padding: "6px 12px",
    fontSize: "14px",
    color: COLORS.ink,
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  }

  const warningStyle = {
    fontSize: "12px",
    color: "#64748b",
    fontStyle: "italic" as const,
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
    marginTop: "8px",
  }

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Allergens</div>
      <div style={chipsContainerStyle}>
        {chips.map((chip, index) => (
          <div key={index} style={chipStyle}>
            <span>{chip.level === "Certain" ? "✅" : "⚠️"}</span>
            <span>{chip.name}</span>
          </div>
        ))}
      </div>
      {chips.length > 0 && (
        <div style={warningStyle}>Allergen list is generated automatically and may be incomplete.</div>
      )}
    </div>
  )
}
