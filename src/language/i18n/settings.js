export const i18nSettings = {
  fallbackLng: 'en',
  supportedLngs: ['en', 'it', 'ar', 'zh'],
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
  interpolation: {
    escapeValue: false,
  },
};
