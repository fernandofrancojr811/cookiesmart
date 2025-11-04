"use client"

import type React from "react"

import type { CSSProperties, ReactNode } from "react"

interface CardProps {
  children: ReactNode
  style?: CSSProperties
  onClick?: () => void
}

export default function Card({ children, style, onClick }: CardProps) {
  const baseStyle: CSSProperties = {
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
    transition: onClick ? "transform 0.2s ease-out, box-shadow 0.2s ease-out" : "none",
    cursor: onClick ? "pointer" : "default",
    ...style,
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.transform = "scale(0.98)"
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.transform = "scale(1)"
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.transform = "scale(1)"
    }
  }

  return (
    <div
      style={baseStyle}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}
