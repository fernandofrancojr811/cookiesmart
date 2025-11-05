"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card } from "@/src/components/Card"
import { CookieLoaderSmall } from "@/src/components/CookieLoader"
import SecondaryButton from "@/src/components/SecondaryButton"

export default function RecipeInputPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [originalServings, setOriginalServings] = useState(8)
  const [targetServings, setTargetServings] = useState(8)
  const [units, setUnits] = useState("grams")
  const [ingredients, setIngredients] = useState("")
  const [isConverting, setIsConverting] = useState(false)

  const handleConvert = async () => {
    setIsConverting(true)
    // Simulate conversion process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/convert/result")
  }

  const field =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-300"
  const btnPrimary =
    "inline-flex items-center justify-center gap-2 rounded-2xl bg-[#BFE3FF] px-5 py-2.5 text-slate-900 font-medium shadow transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
  const labelStyle = { fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "8px" }

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px 16px 100px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#0F172A" }}>Recipe Input</h1>
        <div
          style={{
            display: "inline-flex",
            borderRadius: "24px",
            background: "#FFFFFF",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <SecondaryButton onClick={() => router.push("/menu")} style={{ fontSize: "14px" }}>
            Back
          </SecondaryButton>
        </div>
      </div>

      {/* Title Card */}
      <div style={{ marginBottom: "20px" }}>
        <Card title="Recipe Title">
          <input
            type="text"
            style={{
              width: "100%",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              padding: "12px",
              fontSize: "15px",
              fontFamily: "SF Pro Display, -apple-system, sans-serif",
            }}
            placeholder="e.g., Classic Pancakes"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Card>
      </div>

      {/* Settings Card */}
      <div style={{ marginBottom: "20px" }}>
        <Card title="Settings">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Original Servings</label>
              <input
                type="number"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  padding: "12px",
                  fontSize: "15px",
                }}
                value={originalServings}
                onChange={(e) => setOriginalServings(Number(e.target.value))}
              />
            </div>
            <div>
              <label style={labelStyle}>Target Servings</label>
              <input
                type="number"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  padding: "12px",
                  fontSize: "15px",
                }}
                value={targetServings}
                onChange={(e) => setTargetServings(Number(e.target.value))}
              />
            </div>
            <div>
              <label style={labelStyle}>Units</label>
              <select
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  padding: "12px",
                  fontSize: "15px",
                  background: "#FFFFFF",
                }}
                value={units}
                onChange={(e) => setUnits(e.target.value)}
              >
                <option value="grams">Grams</option>
                <option value="ounces">Ounces</option>
                <option value="us-volume">US Volume</option>
                <option value="metric-volume">Metric Volume</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      {/* Ingredients Card */}
      <div style={{ marginBottom: "24px" }}>
        <Card title="Ingredients">
          <textarea
            style={{
              width: "100%",
              minHeight: "240px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              padding: "12px",
              fontSize: "15px",
              fontFamily: "monospace",
              lineHeight: "1.6",
              color: "#1e293b",
              resize: "vertical",
            }}
            placeholder={"1 1/2 cups all purpose flour\n2 tbsp sugar\n1 cup milk\n1 egg"}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </Card>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <button
          onClick={handleConvert}
          disabled={isConverting}
          aria-busy={isConverting}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            borderRadius: "24px",
            background: "#BFE3FF",
            border: "none",
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: 600,
            color: "#0F172A",
            cursor: isConverting ? "not-allowed" : "pointer",
            opacity: isConverting ? 0.7 : 1,
            transition: "all 200ms ease",
            pointerEvents: isConverting ? "none" : "auto",
          }}
        >
          <span>Convert</span>
          {isConverting && <CookieLoaderSmall />}
        </button>
        <div style={{ display: "inline-flex" }}>
          <SecondaryButton onClick={() => router.push("/")}>Back to Intro</SecondaryButton>
        </div>
      </div>
    </div>
  )
}
