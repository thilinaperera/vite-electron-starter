import { BrowserWindow } from "electron";
import { join, resolve } from "path";
import { URL } from "url";
import config from "./config";

const PACKAGE_ROOT = resolve(__dirname, "../");

async function createWindow() {
  const browserWindow = new BrowserWindow({
    width: config?.window?.width || 1024,
    height: config?.window?.height || 768,
    center: config?.window?.center || true,
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(PACKAGE_ROOT, "/electron-preload/index.cjs"),
    },
  });

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on("ready-to-show", () => {
    browserWindow?.show();

    if (config.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    config.DEV && config.VITE_DEV_SERVER_URL !== undefined
      ? config.VITE_DEV_SERVER_URL
      : new URL(
          "../dist/renderer/index.html",
          "file://" + __dirname
        ).toString();

  await browserWindow.loadURL(pageUrl);

  return browserWindow;
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
