const APP_CONFIG = {
  name: 'LMS Pro',
  version: '1.0.0',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'bn', 'fr', 'es'],
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
};

export default APP_CONFIG;
