const { appConfigs } = require("./.common.config");
if (typeof appConfigs.version === undefined) {
  const now = new Date;
  appConfigs.version = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'build',
    buildResources: 'buildResources',
  },
  files: [
    'dist/**',
  ],
  extraMetadata: {
    version: appConfigs.version,
  },
};

module.exports = config;
