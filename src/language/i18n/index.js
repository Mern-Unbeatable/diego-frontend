import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json' assert { type: 'json' };
import it from '../locales/it.json' assert { type: 'json' };
import ar from '../locales/ar.json' assert { type: 'json' };
import zh from '../locales/zh.json' assert { type: 'json' };

const resources = {
  en: { translation: en },
  it: { translation: it },
  ar: { translation: ar },
  zh: { translation: zh },
};

const i18nSettings = {
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

const isRTL = (lang) => ['ar'].includes(lang);
const applyDirection = (lang) => {
  const dir = isRTL(lang) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  ...i18nSettings,
});

i18n.on('languageChanged', (lng) => {
  applyDirection(lng);
});

export default i18n;
