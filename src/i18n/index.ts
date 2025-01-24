import en from './locales/en.json';
import ko from './locales/ko.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ko'],
    resources: {
      en: { translation: en },
      ko: { translation: ko },
    },
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'navigator', 'localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
