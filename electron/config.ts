declare const __CONFIGS__: Record<string, any>;
const config = __CONFIGS__ || {};

export default {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ...import.meta.env,
  ...config,
  DEV: config.enviroment !== "production",
  PROD: config.enviroment === "production",
};
