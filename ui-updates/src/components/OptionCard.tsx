"use client"

import type { CSSProperties } from "react"
import Card from "./Card"

interface OptionCardProps {
  emoji: string
  title: string
  description?: string
  onClick?: () => void
}

export default function OptionCard({ emoji, title, description, onClick }: OptionCardProps) {
  const emojiStyle: CSSProperties = {
    fontSize: "48px",
    marginBottom: "16px",
  }

  const titleStyle: CSSProperties = {
    fontSize: "20px",
    fontWeight: 600,
    color: "#0F172A",
    marginBottom: description ? "8px" : 0,
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  }

  const descriptionStyle: CSSProperties = {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: 1.5,
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  }

  return (
    <Card onClick={onClick} style={{ textAlign: "center" }}>
      <div style={emojiStyle}>{emoji}</div>
      <div style={titleStyle}>{title}</div>
      {description && <div style={descriptionStyle}>{description}</div>}
    </Card>
  )
}
