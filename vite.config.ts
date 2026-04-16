/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from "@tailwindcss/vite";
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue(), tailwindcss(), dts({
    insertTypesEntry: true,
    include: ["src/**/*.ts", "src/**/*.vue"]
  })],
  test: {
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", "dist/**", "storybook-static/**"],
    environment: "node"
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "IUui",
      fileName: format => `vue-iu-ui.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
