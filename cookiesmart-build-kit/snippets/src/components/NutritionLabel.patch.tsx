
// Pseudo-patch: use two-column per-serving and totals; import COLORS
/*
import { COLORS, RADII } from "@/src/ui/theme";

export function NutritionLabel({ totals, perServing }:{
  totals: { calories:number; protein:string; carbs:string; fat:string };
  perServing: { calories:number; protein:string; carbs:string; fat:string };
}) {
  return (
    <div style={{ background: COLORS.white, borderRadius: RADII.lg, padding: 16, boxShadow: "0 6px 16px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>Per Serving</div>
          <div>Calories: {perServing.calories}</div>
          <div>Protein: {perServing.protein}</div>
          <div>Carbs: {perServing.carbs}</div>
          <div>Fat: {perServing.fat}</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>Whole Recipe</div>
          <div>Calories: {totals.calories}</div>
          <div>Protein: {totals.protein}</div>
          <div>Carbs: {totals.carbs}</div>
          <div>Fat: {totals.fat}</div>
        </div>
      </div>
    </div>
  );
}
*/
