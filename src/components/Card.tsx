"use client"

import type React from "react"

import type { CSSProperties, ReactNode } from "react"

interface CardProps {
  title?: string
  children: ReactNode
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

export function Card({ title, children, style, className, onClick }: CardProps) {
  return (
    <section
      className={className}
      style={{
        borderRadius: "16px",
        background: "#FFFFFF",
        boxShadow: "0 12px 32px rgba(136, 207, 241, 0.25), 0 4px 12px rgba(243, 194, 194, 0.18)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        padding: "20px",
        animation: "fadeInUp 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
        opacity: 0,
        cursor: onClick ? "pointer" : "default",
        transition: onClick ? "transform 0.2s ease-out, box-shadow 0.2s ease-out" : "none",
        ...style,
      }}
      onClick={onClick}
      onMouseDown={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "scale(0.98)"
        }
      }}
      onMouseUp={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "scale(1)"
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "scale(1)"
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
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
