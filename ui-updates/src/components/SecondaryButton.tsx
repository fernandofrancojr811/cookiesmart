"use client"

import type { CSSProperties, ReactNode } from "react"

interface SecondaryButtonProps {
  children: ReactNode
  onClick?: () => void
  style?: CSSProperties
}

export default function SecondaryButton({ children, onClick, style }: SecondaryButtonProps) {
  const baseStyle: CSSProperties = {
    background: "#FFFFFF",
    color: "#5BA8E0",
    border: "2px solid #FF8FA3",
    borderRadius: "24px",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
    transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out, background 0.2s ease-out",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
    minHeight: "44px",
    ...style,
  }

  return (
    <button
      style={baseStyle}
      onClick={onClick}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.96)"
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#FFF5F7"
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "#FFFFFF"
      }}
    >
      {children}
    </button>
  )
}
