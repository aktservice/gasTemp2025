import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import tailwindcss from "@tailwindcss/vite";
import handlebars from "vite-plugin-handlebars";

// https://vite.dev/config/
export default defineConfig({
  root: "./app/frontend/",
  plugins: [
    handlebars({ partialDirectory: "./app/frontend/partials" }),
    viteSingleFile(),
    tailwindcss(),
  ],
  build: {
    outDir: "../../dist/",
    emptyOutDir: false,
  },
});
