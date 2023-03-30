import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/api/i18n/{{lng}}.json',
    },
    detection: {
      order: ['htmlTag'],
    },
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: process.env.REACT_APP_I18N_FALLBACK_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    load: 'languageOnly',
  })
  .catch(console.error);

export default i18n;
