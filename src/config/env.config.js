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

const trimEnv = (value) => (typeof value === 'string' ? value.trim() : value);

const rawConfig = Object.freeze({
  MODE: env.MODE,
  IS_DEV: env.DEV,
  IS_PROD: env.PROD,
  API_BASE_URL: trimEnv(env.VITE_API_BASE_URL ?? env.API_BASE_URL) || '/api/v1',
  APP_NAME: trimEnv(env.VITE_APP_NAME ?? env.APP_NAME),
  STRIPE_PUBLISHABLE_KEY: trimEnv(
    env.VITE_STRIPE_PUBLISHABLE_KEY ?? env.STRIPE_PUBLISHABLE_KEY ?? '',
  ),
  PAYPAL_CLIENT_ID: trimEnv(
    env.VITE_PAYPAL_CLIENT_ID ?? env.PAYPAL_CLIENT_ID ?? '',
  ),
});

export const ENV_CONFIG = rawConfig;
export default ENV_CONFIG;
