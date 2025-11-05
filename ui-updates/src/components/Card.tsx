"use client"

import type React from "react"

export function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        borderRadius: "16px",
        background: "#FFFFFF",
        boxShadow: "0 12px 32px rgba(136, 207, 241, 0.25), 0 4px 12px rgba(243, 194, 194, 0.18)",
        ring: "1px solid rgba(255, 255, 255, 0.6)",
        padding: "20px",
        animation: "fadeInUp 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
        opacity: 0,
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {title && (
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#0F172A",
            marginBottom: "12px",
            fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}

export default Card
