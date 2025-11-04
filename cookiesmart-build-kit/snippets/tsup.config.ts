
import { defineConfig } from "tsup";
export default defineConfig({
  entry: { core: "src/core/index.ts" },
  format: ["esm","cjs","iife"],
  globalName: "CookieSmartCore",
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
});
