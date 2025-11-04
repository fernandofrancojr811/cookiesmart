"use client"

import { COLORS, SHADOW } from "@/src/ui/theme"

export default function CookieLoader({ size = 140 }: { size?: number }) {
  // Cookie is now a realistic circle with varied chocolate chips that pop in sequentially
  // Added subtle shadows and gradients for depth and polish, using centralized theme

  const chipPositions = [
    { cx: 50, cy: 35, r: 5.5 },
    { cx: 75, cy: 48, r: 6 },
    { cx: 45, cy: 65, r: 5 },
    { cx: 70, cy: 70, r: 5.5 },
    { cx: 55, cy: 50, r: 4.5 },
    { cx: 35, cy: 48, r: 5 },
  ]

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
      <style>{`
        @keyframes cookieRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes chipPop {
          0% { 
            opacity: 0;
            r: 0;
            filter: drop-shadow(0 0 0px rgba(139, 69, 19, 0));
          }
          40% {
            opacity: 1;
            r: var(--chip-r);
            filter: drop-shadow(0 2px 4px rgba(139, 69, 19, 0.4));
          }
          100% {
            opacity: 0.85;
            r: var(--chip-r);
            filter: drop-shadow(0 2px 6px rgba(139, 69, 19, 0.5));
          }
        }
        
        .cookie-loader {
          animation: cookieRotate 4s linear infinite;
          filter: drop-shadow(0 8px 24px ${COLORS.babyPink}40);
        }
        
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
          {/* Cookie gradient for dimensional effect */}
          <radialGradient id="cookieGradient" cx="45%" cy="45%">
            <stop offset="0%" stopColor="#FEFAD9" />
            <stop offset="70%" stopColor="#F4D4A8" />
            <stop offset="100%" stopColor="#E8C077" />
          </radialGradient>

          {/* Subtle shadow under cookie */}
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

        {/* Main cookie circle with gradient */}
        <circle cx="60" cy="60" r="52" fill="url(#cookieGradient)" filter="url(#cookieShadow)" />

        {/* Cookie highlight for 3D effect */}
        <ellipse cx="50" cy="45" rx="20" ry="18" fill="white" opacity="0.15" />

        {/* Crumb texture detail (subtle) */}
        <circle cx="35" cy="75" r="2" fill="#D4A574" opacity="0.3" />
        <circle cx="80" cy="85" r="1.5" fill="#D4A574" opacity="0.25" />
        <circle cx="25" cy="55" r="1" fill="#D4A574" opacity="0.2" />

        {/* Animated chocolate chips - pop in one by one */}
        {chipPositions.map((chip, idx) => (
          <circle
            key={idx}
            cx={chip.cx}
            cy={chip.cy}
            r="6"
            fill="#6B3410"
            className={`chip-pop-${idx + 1}`}
            style={{
              mixBlendMode: "multiply",
            }}
          />
        ))}
      </svg>
    </div>
  )
}
