import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  root: "./app/front",
  plugins: [viteSingleFile(), tailwindcss()],
  build: {
    outDir: "../../dist/",
    emptyOutDir: false,
  },
});
