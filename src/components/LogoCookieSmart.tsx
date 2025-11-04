"use client"

export default function LogoCookieSmart({ size = 120 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cookie circle with bite */}
        <circle cx="60" cy="60" r="50" fill="#FADADD" />
        <circle cx="90" cy="30" r="20" fill="#FFFFFF" />

        {/* Chocolate chips */}
        <circle cx="45" cy="50" r="6" fill="#8B4513" />
        <circle cx="70" cy="55" r="5" fill="#8B4513" />
        <circle cx="55" cy="70" r="6" fill="#8B4513" />
        <circle cx="40" cy="70" r="4" fill="#8B4513" />
        <circle cx="65" cy="40" r="5" fill="#8B4513" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#FADADD",
            lineHeight: 1,
            fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
          }}
        >
          Cookie
        </span>
        <span
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#BFE3FF",
            lineHeight: 1,
            fontFamily: "ui-sans-serif, system-ui, -apple-system, SF Pro Rounded, SF Pro Text",
          }}
        >
          Smart
        </span>
      </div>
    </div>
  )
}
