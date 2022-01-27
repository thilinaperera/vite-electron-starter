import { app } from "electron";
import "./security-restrictions";
import { restoreOrCreateWindow } from "./mainWindow";
import {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";
import config from "./config";

/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on("second-instance", restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration for more power-save
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/v14-x-y/api/app#event-activate-macos Event: 'activate'
 */
app.on("activate", restoreOrCreateWindow);

/**
 * Create app window when background process will be ready
 */
app
  .whenReady()
  .then(restoreOrCreateWindow)
  .catch(e => console.error("Failed create window:", e));

/**
 * Install Redux or some other devtools in development mode only
 */
if (config.DEV) {
  app
    .whenReady()
    .then(() => import("electron-devtools-installer"))
    .then(
      ({ default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS }) =>
        installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS], {
          loadExtensionOptions: {
            allowFileAccess: true,
          },
        })
    )
    .catch(e => console.error("Failed install extension:", e));
}

/**
 * Check new app version in production mode only
 */
if (config.PROD) {
  app
    .whenReady()
    .then(() => import("electron-updater"))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch(e => console.error("Failed check updates:", e));
}
