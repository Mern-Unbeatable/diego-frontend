import { ENV_CONFIG } from './env.config.js';

const APP_CONFIG = Object.freeze({
  name: ENV_CONFIG.APP_NAME,
  version: '1.0.0',
  defaultLanguage: 'en',
  supportedLanguages: Object.freeze(['en', 'bn', 'fr', 'es']),
  get apiBaseUrl() {
    return ENV_CONFIG.API_BASE_URL;
  },
});

export { APP_CONFIG };
export default APP_CONFIG;
