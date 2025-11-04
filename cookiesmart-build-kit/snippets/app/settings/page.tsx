
"use client";
import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "@/src/data/settings";
import { cloudEnabled } from "@/src/data/cloud";

export default function SettingsPage() {
  const [unit, setUnit] = useState<"grams"|"oz"|"cups_tbsp">("grams");
  const [decimals, setDecimals] = useState(1);
  const [pro, setPro] = useState(false);
  const [cloud, setCloud] = useState(false);

  useEffect(() => {
    getSettings().then(s => {
      setUnit(s.unit);
      setDecimals(s.decimals);
      setPro(s.pro);
    });
    cloudEnabled().then(setCloud);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="space-y-2">
        <label className="block font-medium">Default Units</label>
        <select className="border rounded p-2" value={unit} onChange={e=>{ setUnit(e.target.value as any); updateSettings({ unit: e.target.value as any });}}>
          <option value="grams">Grams</option>
          <option value="oz">Ounces</option>
          <option value="cups_tbsp">Cups/Tbsp</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Decimals</label>
        <input type="number" className="border rounded p-2 w-24" value={decimals} onChange={e=>{ const v = Number(e.target.value)||0; setDecimals(v); updateSettings({ decimals: v });}}/>
      </div>
      <div className="space-y-2">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={pro} onChange={e=>{ setPro(e.target.checked); updateSettings({ pro: e.target.checked });}}/>
          <span>Enable Pro (gates Cloud & Custom Densities)</span>
        </label>
      </div>
      <div className="pt-2 text-sm opacity-70">
        Cloud {cloud ? "available (env set)" : "disabled (no env)"}
      </div>
    </div>
  );
}
