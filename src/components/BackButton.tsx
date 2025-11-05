"use client";
import Link from "next/link";

export default function BackButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-slate-800 shadow-sm">
      ← {children}
    </Link>
  );
}
