"use client"

import { useRouter } from "next/navigation"
import type { CSSProperties } from "react"
import LogoCookieSmart from "@/src/components/LogoCookieSmart"
import PrimaryButton from "@/src/components/PrimaryButton"
import Card from "@/src/components/Card"

export default function WelcomePage() {
  const router = useRouter()

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    animation: "fadeInUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
  }

  const cardContentStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    textAlign: "center",
  }

  const subtextStyle: CSSProperties = {
    fontSize: "17px",
    color: "#64748b",
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Text, sans-serif",
    fontWeight: 500,
    letterSpacing: "-0.3px",
  }

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleInBounce {
          0% {
            opacity: 0;
            transform: scale(0.88);
          }
          70% {
            transform: scale(1.08);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .welcome-card {
          animation: scaleInBounce 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .tap-button {
          animation: pulse-soft 3s ease-in-out infinite;
        }

        @keyframes pulse-soft {
          0%,
          100% {
            box-shadow: 
              0 12px 32px rgba(136, 207, 241, 0.25),
              0 4px 12px rgba(243, 194, 194, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 
              0 20px 48px rgba(136, 207, 241, 0.4),
              0 8px 20px rgba(243, 194, 194, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
      <Card style={{ maxWidth: "520px", width: "100%" }} className="welcome-card">
        <div style={cardContentStyle}>
          <LogoCookieSmart size={120} />
          <PrimaryButton
            size="large"
            onClick={() => router.push("/menu")}
            style={{ width: "200px", height: "200px", borderRadius: "50%", fontSize: "16px" }}
            className="tap-button"
          >
            Tap to Begin
          </PrimaryButton>
          <p style={subtextStyle}>Your kitchen&apos;s new best friend</p>
        </div>
      </Card>
    </div>
  )
}
