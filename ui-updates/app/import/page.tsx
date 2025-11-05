"use client"

import { useRouter } from "next/navigation"
import type { CSSProperties } from "react"
import OptionCard from "@/src/components/OptionCard"
import SecondaryButton from "@/src/components/SecondaryButton"
import BottomNav from "@/src/components/BottomNav"

export default function ImportPage() {
  const router = useRouter()

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
    textAlign: "center",
    marginBottom: "16px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  }

  const subtextStyle: CSSProperties = {
    fontSize: "16px",
    color: "#64748b",
    textAlign: "center",
    marginBottom: "48px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  }

  const cardsContainerStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  }

  const backButtonContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
  }

  return (
    <>
      <div style={containerStyle}>
        <h1 style={headerStyle}>Import or Choose from Available</h1>
        <p style={subtextStyle}>CookieSmart will standardize units and calculate nutrition.</p>

        <div style={cardsContainerStyle}>
          <OptionCard emoji="📋" title="Paste a Recipe" onClick={() => router.push("/convert")} />
          <OptionCard emoji="⬆️" title="Upload a File" onClick={() => router.push("/convert")} />
          <OptionCard emoji="🍳" title="Choose from Library" onClick={() => router.push("/convert")} />
        </div>

        <div style={backButtonContainerStyle}>
          <SecondaryButton onClick={() => router.push("/menu")}>Back to Menu</SecondaryButton>
        </div>
      </div>
      <BottomNav current="recipes" />
    </>
  )
}
