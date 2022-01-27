const rc = require("rc");
const { name: service, version } = require("./package.json");
const rawConfigs = rc(
  "service",
  {
    // Defaults
    service,
    version,
    environment: process.env.NODE_ENV || "development",
    window: {
      width: 1024,
      height: 768,
      center: true,
    },
  },
  null
);

const configs = Object.keys(rawConfigs).reduce(({ appConfigs, mainConfigs }, key) => {
  if (key.toString().startsWith("env_")) {
    appConfigs[key.replace("env_", "")] = rawConfigs[key];
  }
  if (key.toString().startsWith("menv_")) {
    mainConfigs[key.replace("menv_", "")] = rawConfigs[key];
  }
  return {
    appConfigs,
    mainConfigs
  };
}, {
  appConfigs: {},
  mainConfigs: {},
});

module.exports = configs;

