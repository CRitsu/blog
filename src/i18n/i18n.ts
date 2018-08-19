import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import * as XHR from 'i18next-xhr-backend';
// import { reactI18nextModule } from 'react-i18next';


i18n
  .use(XHR)
  .use(LanguageDetector)
  // .use(reactI18nextModule) // if not using I18nextProvider
  .init({
    debug: true,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    react: {
      // bindI18n: 'languageChanged loaded',
      // bindStore: 'added removed',
      nsMode: 'default',
      wait: false,
    }
  });


export default i18n;