"use client";
import { useEffect, useState } from "react";
import { db, type SavedRecipe } from "@/src/data/db";
import { listCloudRecipes } from "@/src/data/cloud";

export default function LibraryPage() {
  const [tab, setTab] = useState<"local"|"cloud">("local");
  const [local, setLocal] = useState<SavedRecipe[]>([]);
  const [cloud, setCloud] = useState<any[]>([]);

  useEffect(() => {
    db.recipes.orderBy("updatedAt").reverse().toArray().then(setLocal);
  }, []);

  useEffect(() => {
    if (tab === "cloud") listCloudRecipes().then(setCloud);
  }, [tab]);

  return (
    <div className="p-4">
      <div className="mb-3 flex gap-2">
        <button className={`px-3 py-2 rounded ${tab==="local"?"bg-pink-200":"bg-gray-100"}`} onClick={()=>setTab("local")}>Local</button>
        <button className={`px-3 py-2 rounded ${tab==="cloud"?"bg-blue-200":"bg-gray-100"}`} onClick={()=>setTab("cloud")}>Cloud</button>
      </div>
      {tab==="local" && (
        <div className="space-y-2">
          {local.map(r => (
            <div key={r.id} className="rounded-lg p-3 bg-white shadow-sm">
              <div className="font-semibold">{r.title}</div>
              <div className="text-sm opacity-70">{new Date(r.updatedAt).toLocaleString()}</div>
              <details className="mt-2">
                <summary className="cursor-pointer">View Source</summary>
                <pre className="whitespace-pre-wrap text-sm">{r.sourceText}</pre>
              </details>
            </div>
          ))}
        </div>
      )}
      {tab==="cloud" && (
        <div className="space-y-2">
          {cloud.map((r:any) => (
            <div key={r.id} className="rounded-lg p-3 bg-white shadow-sm">
              <div className="font-semibold">{r.title}</div>
              <div className="text-sm opacity-70">{new Date(r.updated_at).toLocaleString()}</div>
              <details className="mt-2">
                <summary className="cursor-pointer">View Source</summary>
                <pre className="whitespace-pre-wrap text-sm">{r.source_text}</pre>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
