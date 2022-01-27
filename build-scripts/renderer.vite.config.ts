// @ts-nocheck
import { chrome } from "../.electron-vendors.cache.json";
import { join, resolve } from "path";
import { builtinModules } from "module";
import react from "@vitejs/plugin-react";
import { appConfigs } from "../.common.config.js";

const PACKAGE_ROOT = resolve(__dirname, "../");

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: [
      {
        find: "@",
        replace: join(PACKAGE_ROOT, "src").toString() + "/",
      },
      { find: /^~/, replacement: "" },
    ],
  },
  define: {
    __CONFIGS__: JSON.stringify(appConfigs),
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [react()],
  base: "",
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: "dist/renderer",
    assetsDir: ".",
    rollupOptions: {
      input: "index.html",
      external: [...builtinModules.flatMap(p => [p, `node:${p}`])],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  test: {
    environment: "happy-dom",
  },
};

export default config;
