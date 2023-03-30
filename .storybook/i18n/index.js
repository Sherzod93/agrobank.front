import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const namespaces = ['common'];
const supportedLanguages = ['ru', 'uz', 'en'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    defaultNS: 'common',
    fallbackLng: process.env.REACT_APP_I18N_FALLBACK_LANGUAGE || 'ru',
    interpolation: {
      escapeValue: false,
    },
    lng: 'ru',
    ns: namespaces,
    supportedLngs: supportedLanguages,
    react: {
      useSuspense: false,
    },
  }).catch((error) => console.error(error));

supportedLanguages.forEach((lang) => {
  namespaces.forEach((n) => {
    i18n.addResourceBundle(
      lang,
      n,
      require(`./${lang}.json`),
    );
  });
});

export { i18n };
