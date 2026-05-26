import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zh from 'src/v1/logics/locales/cn/translation.json';
import en from 'src/v1/logics/locales/en/translation.json';
import es from 'src/v1/logics/locales/es/translation.json';
import kr from 'src/v1/logics/locales/kr/translation.json';
import vi from 'src/v1/logics/locales/vi/translation.json';


// Khai báo đúng kiểu cho resources
const resources: {
  [key: string]: {
    translation: Record<string, string>;
  };
} = {
  en: { translation: en },
  vi: { translation: vi },
  zh: { translation: zh },
  kr: { translation: kr },
  es: { translation: es },
};

const systemLang = Localization.getLocales?.()[0]?.languageCode ?? "en";
const supportedLangs = Object.keys(resources);
const initialLang = supportedLangs.includes(systemLang) ? systemLang : "en";

i18n
  .use(initReactI18next)
  .init({
    lng: initialLang,
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
    // optional - only include this if you're using legacy v3 format
    compatibilityJSON: 'v4',
    react: {
      useSuspense: false,
    },
  });

export default i18n;
