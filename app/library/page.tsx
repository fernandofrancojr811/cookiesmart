"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db, type SavedRecipe } from "@/src/data/db";
import { listCloudRecipes } from "@/src/data/cloud";
import { appState } from "@/src/state/app";
import { recompute } from "@/src/state/recompute";
import { Card } from "@/src/components/Card";
import BottomNav from "@/src/components/BottomNav";
import SecondaryButton from "@/src/components/SecondaryButton";

export default function LibraryPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"local" | "cloud">("local");
  const [local, setLocal] = useState<SavedRecipe[]>([]);
  const [cloud, setCloud] = useState<any[]>([]);

  useEffect(() => {
    db.recipes.orderBy("updatedAt").reverse().toArray().then(setLocal);
  }, []);

  useEffect(() => {
    if (tab === "cloud") listCloudRecipes().then(setCloud);
  }, [tab]);

  const handleImportLocal = (recipe: SavedRecipe) => {
    appState.rawText = recipe.sourceText;
    if (recipe.servingsOriginal) {
      appState.servingsOriginal = recipe.servingsOriginal;
      appState.currentServings = recipe.servingsOriginal;
    }
    recompute();
    if (appState.parsed && recipe.title) {
      appState.parsed.title = recipe.title;
    }
    router.push("/convert/input");
  };

  const handleImportCloud = (recipe: any) => {
    appState.rawText = recipe.source_text;
    if (recipe.servings_original) {
      appState.servingsOriginal = recipe.servings_original;
      appState.currentServings = recipe.servings_original;
    }
    recompute();
    if (appState.parsed && recipe.title) {
      appState.parsed.title = recipe.title;
    }
    router.push("/convert/input");
  };

  return (
    <>
      <div style={{ maxWidth: "880px", margin: "0 auto", padding: "24px 16px 100px", minHeight: "100vh" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#0F172A" }}>Recipe Library</h1>
          <SecondaryButton onClick={() => router.push("/recipes/import")}>Back</SecondaryButton>
        </div>

        {/* Tab Selector */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          <button
            onClick={() => setTab("local")}
            style={{
              borderRadius: "12px",
              background: tab === "local" ? "#FCD9E5" : "#f3f4f6",
              border: "none",
              padding: "12px 24px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#0F172A",
              cursor: "pointer",
              transition: "all 200ms ease",
            }}
            aria-pressed={tab === "local"}
            aria-label="Show local recipes"
          >
            📱 Local
          </button>
          <button
            onClick={() => setTab("cloud")}
            style={{
              borderRadius: "12px",
              background: tab === "cloud" ? "#BFE3FF" : "#f3f4f6",
              border: "none",
              padding: "12px 24px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#0F172A",
              cursor: "pointer",
              transition: "all 200ms ease",
            }}
            aria-pressed={tab === "cloud"}
            aria-label="Show cloud recipes"
          >
            ☁️ Cloud
          </button>
        </div>

        {/* Local Recipes */}
        {tab === "local" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {local.length === 0 && (
              <Card title="No Recipes Yet">
                <p style={{ fontSize: "14px", color: "#64748b", textAlign: "center", padding: "24px" }}>
                  You haven't saved any recipes locally yet. Import a recipe to get started!
                </p>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                  <SecondaryButton onClick={() => router.push("/import")}>
                    Go to Import
                  </SecondaryButton>
                </div>
              </Card>
            )}
            {local.map((r) => (
              <Card key={r.id} title={r.title || "Untitled Recipe"}>
                <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "12px" }}>
                  Last updated: {new Date(r.updatedAt).toLocaleDateString()} at {new Date(r.updatedAt).toLocaleTimeString()}
                </div>
                {r.description && (
                  <div style={{ fontSize: "14px", color: "#475569", marginBottom: "12px", lineHeight: "1.6" }}>
                    {r.description.substring(0, 150)}{r.description.length > 150 ? "..." : ""}
                  </div>
                )}
                <details style={{ marginBottom: "16px" }}>
                  <summary
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0F172A",
                      padding: "8px 0",
                    }}
                  >
                    View Ingredients
                  </summary>
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      fontSize: "13px",
                      fontFamily: "monospace",
                      color: "#475569",
                      background: "#f9fafb",
                      padding: "12px",
                      borderRadius: "8px",
                      marginTop: "8px",
                      lineHeight: "1.6",
                    }}
                  >
                    {r.sourceText}
                  </pre>
                </details>
                <button
                  onClick={() => handleImportLocal(r)}
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #BFE3FF 0%, #A8D8FF 100%)",
                    border: "none",
                    padding: "12px 24px",
                    fontSize: "15px",
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
                  aria-label={`Import ${r.title || "recipe"} and convert`}
                >
                  Import → Convert
                </button>
              </Card>
            ))}
          </div>
        )}

        {/* Cloud Recipes */}
        {tab === "cloud" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {cloud.length === 0 && (
              <Card title="No Cloud Recipes">
                <p style={{ fontSize: "14px", color: "#64748b", textAlign: "center", padding: "24px" }}>
                  No recipes found in the cloud. Sync your recipes to see them here.
                </p>
              </Card>
            )}
            {cloud.map((r: any) => (
              <Card key={r.id} title={r.title || "Untitled Recipe"}>
                <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "12px" }}>
                  Last updated: {new Date(r.updated_at).toLocaleDateString()} at {new Date(r.updated_at).toLocaleTimeString()}
                </div>
                {r.description && (
                  <div style={{ fontSize: "14px", color: "#475569", marginBottom: "12px", lineHeight: "1.6" }}>
                    {r.description.substring(0, 150)}{r.description.length > 150 ? "..." : ""}
                  </div>
                )}
                <details style={{ marginBottom: "16px" }}>
                  <summary
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0F172A",
                      padding: "8px 0",
                    }}
                  >
                    View Ingredients
                  </summary>
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      fontSize: "13px",
                      fontFamily: "monospace",
                      color: "#475569",
                      background: "#f9fafb",
                      padding: "12px",
                      borderRadius: "8px",
                      marginTop: "8px",
                      lineHeight: "1.6",
                    }}
                  >
                    {r.source_text}
                  </pre>
                </details>
                <button
                  onClick={() => handleImportCloud(r)}
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #BFE3FF 0%, #A8D8FF 100%)",
                    border: "none",
                    padding: "12px 24px",
                    fontSize: "15px",
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
                  aria-label={`Import ${r.title || "recipe"} and convert`}
                >
                  Import → Convert
                </button>
              </Card>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
          <SecondaryButton onClick={() => router.push("/import")}>Back to Import</SecondaryButton>
        </div>
      </div>
      <BottomNav current="recipes" />
    </>
  );
}
