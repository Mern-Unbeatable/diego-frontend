import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { resources } from '../locales';
import { i18nSettings } from './settings';
import { applyDirection } from './rtl';

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  ...i18nSettings,
});

i18n.on('languageChanged', (lng) => {
  applyDirection(lng);
});

export default i18n;
