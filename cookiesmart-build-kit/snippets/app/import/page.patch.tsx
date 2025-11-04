
// Pseudo-patch for Upload + Library flow
/*
"use client";
import { useRouter } from "next/navigation";
import { appState } from "@/src/state/app";
import { recompute } from "@/src/state/recompute";

export default function ImportPage() {
  const router = useRouter();

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    appState.rawText = text;
    recompute();
    router.push("/convert");
  }

  return (
    <div className="p-4 space-y-4">
      <button className="px-3 py-2 rounded bg-pink-200" onClick={()=>router.push("/convert")}>Paste Recipe</button>
      <label className="block">
        <span className="px-3 py-2 rounded bg-blue-200 inline-block cursor-pointer">Upload .txt</span>
        <input type="file" accept=".txt" className="hidden" onChange={onFile}/>
      </label>
      <button className="px-3 py-2 rounded bg-gray-200" onClick={()=>router.push("/library")}>Choose from Library</button>
    </div>
  );
}
*/
