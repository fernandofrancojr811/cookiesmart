"use client"

import type { CSSProperties } from "react"

interface BottomNavProps {
  current?: "home" | "recipes" | "settings"
}

export default function BottomNav({ current = "home" }: BottomNavProps) {
  const navStyle: CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#FFFFFF",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-around",
    padding: "12px 0",
    boxShadow: "0 -4px 12px rgba(15, 23, 42, 0.04)",
  }

  const buttonStyle = (active: boolean): CSSProperties => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 24px",
    fontSize: "24px",
    opacity: active ? 1 : 0.4,
    transition: "opacity 0.2s ease-out",
    minWidth: "44px",
    minHeight: "44px",
  })

  return (
    <nav style={navStyle}>
      <button style={buttonStyle(current === "home")} aria-label="Home" onClick={() => console.log("Navigate to home")}>
        🍪
      </button>
      <button
        style={buttonStyle(current === "recipes")}
        aria-label="Recipes"
        onClick={() => console.log("Navigate to recipes")}
      >
        📖
      </button>
      <button
        style={buttonStyle(current === "settings")}
        aria-label="Settings"
        onClick={() => console.log("Navigate to settings")}
      >
        ⚙️
      </button>
    </nav>
  )
}
