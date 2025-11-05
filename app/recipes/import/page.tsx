"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { appState } from "@/src/state/app";
import { recompute } from "@/src/state/recompute";
import { searchOnlineRecipes, importOnlineRecipe } from "@/src/data/recipes-online";
import { Card } from "@/src/components/Card";
import SecondaryButton from "@/src/components/SecondaryButton";
import BottomNav from "@/src/components/BottomNav";

export default function ImportRecipePage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [online, setOnline] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const text = await file.text();
      appState.rawText = text;
      recompute();
      router.push("/convert/input");
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Failed to read file. Please try again.");
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md"))) {
      handleFileUpload(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  return (
    <>
      <div style={{ maxWidth: "880px", margin: "0 auto", padding: "24px 16px 100px", minHeight: "100vh" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#0F172A" }}>Import Recipe</h1>
          <SecondaryButton onClick={() => router.push("/menu")}>Back</SecondaryButton>
        </div>

        {/* Paste Recipe Form - RecipePasteForm */}
        <div style={{ marginBottom: "20px" }}>
          <Card title="📋 Paste Recipe Text">
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "16px" }}>
              Start typing or paste your recipe ingredients to begin conversion.
            </p>
            <button
              onClick={() => router.push("/convert/input")}
              style={{
                width: "100%",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #BFE3FF 0%, #A8D8FF 100%)",
                border: "none",
                padding: "16px 24px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#0F172A",
                cursor: "pointer",
                transition: "all 200ms ease",
                boxShadow: "0 2px 8px rgba(191, 227, 255, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(191, 227, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(191, 227, 255, 0.3)";
              }}
              aria-label="Open recipe input form"
            >
              Open Recipe Input Form
            </button>
          </Card>
        </div>

        {/* File Upload Dropzone - FileUploadDropzone */}
        <div style={{ marginBottom: "20px" }}>
          <Card title="⬆️ Upload Recipe File">
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "16px" }}>
              Drag and drop a .txt or .md file, or click to browse.
            </p>
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => fileInputRef.current?.click()}
              style={{
                borderRadius: "12px",
                border: isDragging ? "2px dashed #3b82f6" : "2px dashed #e5e7eb",
                background: isDragging ? "rgba(191, 227, 255, 0.1)" : "#fafafa",
                padding: "48px 24px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload recipe file. Press enter to select a file."
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📄</div>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "#0F172A", marginBottom: "8px" }}>
                {isDragging ? "Drop file here" : "Drop file or click to browse"}
              </div>
              <div style={{ fontSize: "14px", color: "#94a3b8" }}>
                Supports .txt and .md files
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,text/plain"
                onChange={onFileInputChange}
                style={{ display: "none" }}
                aria-hidden="true"
              />
            </div>
          </Card>
        </div>

        {/* Recipe Library Grid - RecipeLibraryGrid */}
        <div style={{ marginBottom: "20px" }}>
          <Card title="🍳 Recipe Library">
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "16px" }}>
              Browse and select from your saved recipes.
            </p>
            <button
              onClick={() => router.push("/library")}
              style={{
                width: "100%",
                borderRadius: "12px",
                background: "#FFFFFF",
                border: "1px solid #e5e7eb",
                padding: "16px 24px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#0F172A",
                cursor: "pointer",
                transition: "all 200ms ease",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f9fafb";
                e.currentTarget.style.borderColor = "#d1d5db";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FFFFFF";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
              aria-label="Open recipe library"
            >
              Browse Library
            </button>
          </Card>
        </div>

        {/* Online Recipe Search */}
        <div style={{ marginBottom: "32px" }}>
          <Card title="🌐 Online Recipe Search">
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "16px" }}>
              Search and import recipes from TheMealDB.
            </p>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <input
                type="text"
                placeholder="Search meals..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchOnlineRecipes(q).then(setOnline);
                  }
                }}
                style={{
                  flex: 1,
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  padding: "12px",
                  fontSize: "15px",
                  fontFamily: "SF Pro Display, -apple-system, sans-serif",
                }}
                aria-label="Search for online recipes"
              />
              <button
                onClick={async () => setOnline(await searchOnlineRecipes(q))}
                style={{
                  borderRadius: "12px",
                  background: "#3b82f6",
                  border: "none",
                  padding: "12px 24px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  cursor: "pointer",
                  transition: "all 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2563eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#3b82f6";
                }}
                aria-label="Search for recipes"
              >
                Search
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {online.map((r) => (
                <div
                  key={r.id}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    padding: "16px",
                    background: "#FFFFFF",
                    transition: "all 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: 600, color: "#0F172A", marginBottom: "4px" }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "12px" }}>
                    {r.category} • {r.area}
                  </div>
                  <button
                    onClick={() => importOnlineRecipe(r, router)}
                    style={{
                      borderRadius: "8px",
                      background: "#FCD9E5",
                      border: "none",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0F172A",
                      cursor: "pointer",
                      transition: "all 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FBC4D8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FCD9E5";
                    }}
                    aria-label={`Import ${r.title} and convert`}
                  >
                    Import → Convert
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Back Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SecondaryButton onClick={() => router.push("/menu")}>Back to Menu</SecondaryButton>
        </div>
      </div>
      <BottomNav current="recipes" />
    </>
  );
}

