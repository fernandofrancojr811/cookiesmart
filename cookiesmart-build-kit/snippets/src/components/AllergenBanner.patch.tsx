
// Pseudo-patch: import COLORS, render chips with level
/*
import { COLORS } from "@/src/ui/theme";

export function AllergenBanner({ chips }: { chips: { name: string; level: "Certain"|"Possible" }[] }) {
  return (
    <div style={{ background: COLORS.babyPink, padding: 12, borderRadius: 16, boxShadow: "var(--cookie-shadow)" }}>
      <div style={{ fontWeight: 600, color: COLORS.ink, marginBottom: 8 }}>Allergens</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {chips.map((c, i) => (
          <span key={i} style={{ background: "#fff", borderRadius: 999, padding: "6px 10px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
            {c.name} {c.level === "Certain" ? "✅" : "⚠️"}
          </span>
        ))}
      </div>
    </div>
  );
}
*/
