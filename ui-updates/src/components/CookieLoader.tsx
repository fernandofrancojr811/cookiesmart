"use client"

export function CookieLoaderSmall() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "inline-block",
        animation: "cookieRotate 2s linear infinite",
      }}
    >
      <style>{`
        @keyframes cookieRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes chipPop {
          0% { opacity: 0; r: 0; filter: drop-shadow(0 0 0px rgba(139, 69, 19, 0)); }
          40% { opacity: 1; r: var(--chip-r); filter: drop-shadow(0 1px 2px rgba(139, 69, 19, 0.4)); }
          100% { opacity: 0.85; r: var(--chip-r); filter: drop-shadow(0 1px 3px rgba(139, 69, 19, 0.5)); }
        }
        .chip-pop-1 { --chip-r: 5.5px; animation: chipPop 3s ease-in-out infinite; }
        .chip-pop-2 { --chip-r: 6px; animation: chipPop 3s ease-in-out infinite 0.35s; }
        .chip-pop-3 { --chip-r: 5px; animation: chipPop 3s ease-in-out infinite 0.7s; }
        .chip-pop-4 { --chip-r: 5.5px; animation: chipPop 3s ease-in-out infinite 1.05s; }
        .chip-pop-5 { --chip-r: 4.5px; animation: chipPop 3s ease-in-out infinite 1.4s; }
        .chip-pop-6 { --chip-r: 5px; animation: chipPop 3s ease-in-out infinite 1.75s; }
      `}</style>

      <defs>
        <radialGradient id="cookieGradientSmall" cx="45%" cy="45%">
          <stop offset="0%" stopColor="#FEFAD9" />
          <stop offset="70%" stopColor="#F4D4A8" />
          <stop offset="100%" stopColor="#E8C077" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="52" fill="url(#cookieGradientSmall)" />
      <ellipse cx="50" cy="45" rx="20" ry="18" fill="white" opacity="0.15" />
      {[
        { cx: 50, cy: 35 },
        { cx: 75, cy: 48 },
        { cx: 45, cy: 65 },
        { cx: 70, cy: 70 },
        { cx: 55, cy: 50 },
        { cx: 35, cy: 48 },
      ].map((chip, idx) => (
        <circle
          key={idx}
          cx={chip.cx}
          cy={chip.cy}
          r="6"
          fill="#6B3410"
          className={`chip-pop-${idx + 1}`}
          style={{ mixBlendMode: "multiply" }}
        />
      ))}
    </svg>
  )
}

export default function CookieLoader({ size = 140 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
      <style>{`
        @keyframes cookieRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes chipPop {
          0% { opacity: 0; r: 0; filter: drop-shadow(0 0 0px rgba(139, 69, 19, 0)); }
          40% { opacity: 1; r: var(--chip-r); filter: drop-shadow(0 2px 4px rgba(139, 69, 19, 0.4)); }
          100% { opacity: 0.85; r: var(--chip-r); filter: drop-shadow(0 2px 6px rgba(139, 69, 19, 0.5)); }
        }
        .cookie-loader { animation: cookieRotate 4s linear infinite; filter: drop-shadow(0 8px 24px rgba(250, 173, 221, 0.25)); }
        .chip-pop-1 { --chip-r: 5.5px; animation: chipPop 3s ease-in-out infinite; }
        .chip-pop-2 { --chip-r: 6px; animation: chipPop 3s ease-in-out infinite 0.35s; }
        .chip-pop-3 { --chip-r: 5px; animation: chipPop 3s ease-in-out infinite 0.7s; }
        .chip-pop-4 { --chip-r: 5.5px; animation: chipPop 3s ease-in-out infinite 1.05s; }
        .chip-pop-5 { --chip-r: 4.5px; animation: chipPop 3s ease-in-out infinite 1.4s; }
        .chip-pop-6 { --chip-r: 5px; animation: chipPop 3s ease-in-out infinite 1.75s; }
      `}</style>

      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cookie-loader"
      >
        <defs>
          <radialGradient id="cookieGradient" cx="45%" cy="45%">
            <stop offset="0%" stopColor="#FEFAD9" />
            <stop offset="70%" stopColor="#F4D4A8" />
            <stop offset="100%" stopColor="#E8C077" />
          </radialGradient>
          <filter id="cookieShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.15" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="60" cy="60" r="52" fill="url(#cookieGradient)" filter="url(#cookieShadow)" />
        <ellipse cx="50" cy="45" rx="20" ry="18" fill="white" opacity="0.15" />
        <circle cx="35" cy="75" r="2" fill="#D4A574" opacity="0.3" />
        <circle cx="80" cy="85" r="1.5" fill="#D4A574" opacity="0.25" />
        <circle cx="25" cy="55" r="1" fill="#D4A574" opacity="0.2" />

        {[
          { cx: 50, cy: 35 },
          { cx: 75, cy: 48 },
          { cx: 45, cy: 65 },
          { cx: 70, cy: 70 },
          { cx: 55, cy: 50 },
          { cx: 35, cy: 48 },
        ].map((chip, idx) => (
          <circle
            key={idx}
            cx={chip.cx}
            cy={chip.cy}
            r="6"
            fill="#6B3410"
            className={`chip-pop-${idx + 1}`}
            style={{ mixBlendMode: "multiply" }}
          />
        ))}
      </svg>
    </div>
  )
}
