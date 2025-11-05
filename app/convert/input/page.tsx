"use client";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { appState } from "@/src/state/app";
import { recompute } from "@/src/state/recompute";
import { getSettings, updateSettings } from "@/src/data/settings";
import { useEffect, useState } from "react";
import { Card } from "@/src/components/Card";
import { CookieLoaderSmall } from "@/src/components/CookieLoader";
import SecondaryButton from "@/src/components/SecondaryButton";

export default function ConvertInputPage() {
  const router = useRouter();
  const snap = useSnapshot(appState);
  const [title, setTitle] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    getSettings().then(s => {
      appState.targetUnit = s.unit as any;
      appState.decimals = s.decimals;
    });
    if (snap.parsed?.title) setTitle(snap.parsed.title);
  }, []);

  function onTextChange(v: string) {
    appState.rawText = v;
    recompute();
    if (appState.parsed?.title) setTitle(appState.parsed.title);
  }

  function onConvert() {
    if (title?.trim() && appState.parsed) {
      appState.parsed.title = title.trim();
    }
    setIsConverting(true);
    document.body.classList.add("cursor-wait");
    setTimeout(() => {
      document.body.classList.remove("cursor-wait");
      setIsConverting(false);
      router.push("/convert/result");
    }, 600);
  }

  const labelStyle = { fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "8px" };

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
                value={snap.servingsOriginal}
                onChange={(e) => { appState.servingsOriginal = Number(e.target.value)||1; recompute(); }}
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
                value={snap.currentServings}
                onChange={(e) => { appState.currentServings = Number(e.target.value)||1; recompute(); }}
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
                value={snap.targetUnit}
                onChange={(e) => { appState.targetUnit = e.target.value as any; updateSettings({ unit: e.target.value as any }); }}
              >
                <option value="grams">Grams</option>
                <option value="oz">Ounces</option>
                <option value="cups_tbsp">Cups/Tbsp</option>
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
            value={snap.rawText}
            onChange={(e) => onTextChange(e.target.value)}
          />
        </Card>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <button
          onClick={onConvert}
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
  );
}
