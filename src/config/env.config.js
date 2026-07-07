const requiredEnvVars = Object.freeze({
  API_BASE_URL: 'API base URL',
  APP_NAME: 'Application name',
});

const env = import.meta.env;

Object.entries(requiredEnvVars).forEach(([key, label]) => {
  const value = env[`VITE_${key}`] ?? env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key} (${label})`);
  }
});

const rawConfig = Object.freeze({
  MODE: env.MODE,
  IS_DEV: env.DEV,
  IS_PROD: env.PROD,
  API_BASE_URL: env.VITE_API_BASE_URL ?? env.API_BASE_URL,
  APP_NAME: env.VITE_APP_NAME ?? env.APP_NAME,
});

export const ENV_CONFIG = rawConfig;
export default ENV_CONFIG;
