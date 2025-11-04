"use client"

import type { CSSProperties, ReactNode } from "react"

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  size?: "normal" | "large"
  style?: CSSProperties
  className?: string
}

export default function PrimaryButton({ children, onClick, size = "normal", style, className }: PrimaryButtonProps) {
  const baseStyle: CSSProperties = {
    background: "linear-gradient(135deg, #88CFF1 0%, #A1E1F7 50%, #F3C2C2 100%)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: size === "large" ? "60px" : "28px",
    padding: size === "large" ? "24px 48px" : "16px 32px",
    fontSize: size === "large" ? "18px" : "16px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow:
      "0 12px 32px rgba(136, 207, 241, 0.25), 0 4px 12px rgba(243, 194, 194, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Text, sans-serif",
    minWidth: size === "large" ? "200px" : "120px",
    minHeight: "48px",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.08)",
    ...style,
  }

  return (
    <button
      style={baseStyle}
      onClick={onClick}
      className={className}
      onMouseDown={(e) => {
        const btn = e.currentTarget as HTMLButtonElement
        btn.style.transform = "scale(0.95)"
        btn.style.boxShadow =
          "0 4px 12px rgba(136, 207, 241, 0.15), 0 2px 6px rgba(243, 194, 194, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
      }}
      onMouseUp={(e) => {
        const btn = e.currentTarget as HTMLButtonElement
        btn.style.transform = "scale(1)"
        btn.style.boxShadow =
          "0 12px 32px rgba(136, 207, 241, 0.25), 0 4px 12px rgba(243, 194, 194, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget as HTMLButtonElement
        btn.style.transform = "scale(1)"
        btn.style.boxShadow =
          "0 12px 32px rgba(136, 207, 241, 0.25), 0 4px 12px rgba(243, 194, 194, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
      }}
    >
      {children}
    </button>
  )
}
