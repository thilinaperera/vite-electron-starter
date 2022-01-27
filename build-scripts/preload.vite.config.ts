// @ts-nocheck
import { chrome } from "../.electron-vendors.cache.json";
import { join, resolve } from "path";
import { builtinModules } from "module";
import { appConfigs, mainConfigs } from "../.common.config.js";
import { defineConfig } from "vite";

const PACKAGE_ROOT = resolve(__dirname, "../");

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...appConfigs, ...mainConfigs };

  return defineConfig({
    mode: mode,
    root: PACKAGE_ROOT,
    envDir: process.cwd(),
    resolve: {
      alias: {
        "/@/": join(PACKAGE_ROOT, "electron-preload") + "/",
      },
    },
    define: {
      __CONFIGS__: JSON.stringify({ ...appConfigs, ...mainConfigs }),
    },
    build: {
      sourcemap: "inline",
      target: `chrome${chrome}`,
      outDir: "dist/electron-preload",
      assetsDir: ".",
      minify: appConfigs.environment === "production",
      lib: {
        entry: "electron-preload/index.ts",
        formats: ["cjs"],
      },
      rollupOptions: {
        external: [
          "electron",
          ...builtinModules.flatMap(p => [p, `node:${p}`]),
        ],
        output: {
          entryFileNames: "[name].cjs",
        },
      },
      emptyOutDir: true,
      brotliSize: false,
    },
  });
};
