export default function NutritionFacts({
  totals,
  per,
}: {
  totals: { calories: number; protein: string; carbs: string; fat: string };
  per:    { calories: number; protein: string; carbs: string; fat: string };
}) {
  return (
    <div className="rounded-2xl border-2 border-slate-900 p-4 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="text-xl font-extrabold text-slate-900 mb-2">Nutrition Facts</div>
      <div className="h-[2px] w-full bg-slate-900/80 mb-3" />
      <div className="space-y-1">
        <div className="font-semibold text-slate-900">Total Recipe</div>
        <Row k="Calories" v={totals.calories} />
        <Row k="Protein" v={totals.protein} />
        <Row k="Carbohydrates" v={totals.carbs} />
        <Row k="Fat" v={totals.fat} />
      </div>

      <div className="my-3 h-px w-full bg-slate-200" />

      <div className="space-y-1">
        <div className="font-semibold text-slate-900">Per Serving</div>
        <Row k="Calories" v={per.calories} />
        <Row k="Protein" v={per.protein} />
        <Row k="Carbohydrates" v={per.carbs} />
        <Row k="Fat" v={per.fat} />
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string | number }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-slate-200 last:border-0">
      <span className="text-slate-800">{k}</span>
      <span className="font-semibold text-slate-900">{v}</span>
    </div>
  );
}
