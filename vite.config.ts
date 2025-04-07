import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vite.dev/config/
export default defineConfig({
  root: "./app/front",
  plugins: [viteSingleFile()],
  build: {
    outDir: "../../dist/",
    emptyOutDir: false,
  },
});
