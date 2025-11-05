"use client";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { appState } from "@/src/state/app";
import { recompute } from "@/src/state/recompute";
import { getSettings, updateSettings } from "@/src/data/settings";
import { useEffect, useState } from "react";
import BackButton from "@/src/components/BackButton";

export default function ConvertInputPage() {
  const router = useRouter();
  const snap = useSnapshot(appState);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getSettings().then(s => {
      appState.targetUnit = s.unit as any;
      appState.decimals = s.decimals;
    });
    if (snap.parsed?.meta?.title) setTitle(snap.parsed.meta.title);
  }, []);

  function onTextChange(v: string) {
    appState.rawText = v;
    recompute();
    if (appState.parsed?.meta?.title) setTitle(appState.parsed.meta.title);
  }

  function onConvert() {
    if (title?.trim()) {
      if (appState.parsed) {
        appState.parsed.meta = { ...(appState.parsed.meta||{}), title: title.trim() };
      }
    }
    document.body.classList.add("cursor-wait");
    setTimeout(() => {
      document.body.classList.remove("cursor-wait");
      router.push("/convert/result");
    }, 600);
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Recipe Input</h1>
        <BackButton href="/menu">Back to Menu</BackButton>
      </div>

      <label className="block text-sm font-medium">Recipe Title</label>
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="e.g., Classic Pancakes"
        value={title}
        onChange={e=>setTitle(e.target.value)}
      />

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium">Original Servings</label>
          <input type="number" className="border rounded p-2 w-28"
            value={snap.servingsOriginal}
            onChange={e=>{ appState.servingsOriginal = Number(e.target.value)||1; recompute(); }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Target Servings</label>
          <input type="number" className="border rounded p-2 w-28"
            value={snap.currentServings}
            onChange={e=>{ appState.currentServings = Number(e.target.value)||1; recompute(); }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Units</label>
          <select className="border rounded p-2"
            value={snap.targetUnit}
            onChange={e=>{ appState.targetUnit = e.target.value as any; updateSettings({ unit: e.target.value as any }); }}
          >
            <option value="grams">Grams</option>
            <option value="oz">Ounces</option>
            <option value="cups_tbsp">Cups/Tbsp</option>
          </select>
        </div>
      </div>

      <label className="block text-sm font-medium">Ingredients (one per line)</label>
      <textarea
        className="w-full h-48 p-3 rounded-lg border"
        placeholder="1 1/2 cups all purpose flour
2 tbsp sugar
1 cup milk
1 egg"
        value={snap.rawText}
        onChange={e=>onTextChange(e.target.value)}
      />

      <div className="flex gap-3">
        <button onClick={onConvert} className="px-4 py-2 rounded bg-blue-600 text-white">
          Convert
        </button>
        <BackButton href="/">Back to Intro</BackButton>
      </div>
    </div>
  );
}
