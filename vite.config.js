import { defineConfig } from "vite";

export default defineConfig({
  base: "/projeto-ong/",
  build: {
    target: "es2020",
    minify: "esbuild",
    outDir: "dist",
    emptyOutDir: true
  }
});
