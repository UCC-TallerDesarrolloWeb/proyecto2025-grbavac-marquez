import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
      "@components": path.resolve(rootDir, "src/components"),
      "@pages": path.resolve(rootDir, "src/pages"),
      "@styles": path.resolve(rootDir, "src/styles"),
      "@data": path.resolve(rootDir, "src/data"),
      "@api": path.resolve(rootDir, "src/api"),
    },
  },
});
