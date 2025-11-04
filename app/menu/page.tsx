"use client"

import { useRouter } from "next/navigation"
import type { CSSProperties } from "react"
import PrimaryButton from "@/src/components/PrimaryButton"
import BottomNav from "@/src/components/BottomNav"
import CookieLoader from "@/src/components/CookieLoader"

export default function MenuPage() {
  const router = useRouter()

  const containerStyle: CSSProperties = {
    maxWidth: "880px",
    margin: "0 auto",
    padding: "40px 20px 100px",
    minHeight: "100vh",
    animation: "fadeInUp 0.6s ease-out", // added entrance animation
  }

  const headerStyle: CSSProperties = {
    fontSize: "32px",
    fontWeight: 700,
    color: "#0F172A",
    textAlign: "center",
    marginBottom: "48px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
  }

  const buttonsContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    maxWidth: "500px",
    margin: "0 auto",
  }

  const comingSoonStyle: CSSProperties = {
    fontSize: "14px",
    color: "#94a3b8",
    textAlign: "center",
    marginTop: "16px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
    fontStyle: "italic",
  }

  const backButtonContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginTop: "48px",
  }

  const backButtonStyle: CSSProperties = {
    background: "transparent",
    color: "#64748b",
    border: "none",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    padding: "12px 24px",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
    textDecoration: "underline",
    transition: "color 0.2s ease-out",
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .menu-header {
          animation: slideInDown 0.7s ease-out;
        }

        .menu-button-container {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .coming-soon-text {
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }
      `}</style>
      <div style={containerStyle}>
        <h1 style={headerStyle} className="menu-header">
          What would you like to do today?
        </h1>
        <div style={buttonsContainerStyle} className="menu-button-container">
          <PrimaryButton onClick={() => router.push("/import")} style={{ width: "100%", padding: "32px" }}>
            Calculate Recipe Conversions
          </PrimaryButton>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "32px" }}>
            <CookieLoader size={60} />
          </div>
          <p style={comingSoonStyle} className="coming-soon-text">
            More features coming soon...
          </p>
        </div>
        <div style={backButtonContainerStyle}>
          <button
            style={backButtonStyle}
            onClick={() => router.push("/")}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0F172A"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#64748b"
            }}
          >
            ← Back to Intro
          </button>
        </div>
      </div>
      <BottomNav current="home" />
    </>
  )
}
