import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import UnoCSS from "unocss/vite";
import { presetUno } from "unocss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    UnoCSS({
      presets: [presetUno()],
    }),
  ],
});
