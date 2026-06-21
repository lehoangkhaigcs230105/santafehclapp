import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import zh from "src/v1/logics/locales/cn/translation.json";
import en from "src/v1/logics/locales/en/translation.json";
import es from "src/v1/logics/locales/es/translation.json";
import kr from "src/v1/logics/locales/kr/translation.json";
import vi from "src/v1/logics/locales/vi/translation.json";

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

const supportedLangs = Object.keys(resources);
const rawSystemLang = Localization.getLocales?.()[0]?.languageCode ?? "en";
const normalizedSystemLang =
  rawSystemLang === "ko"
    ? "kr"
    : rawSystemLang === "cn"
      ? "zh"
      : rawSystemLang;
const initialLang = supportedLangs.includes(normalizedSystemLang)
  ? normalizedSystemLang
  : "en";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources,
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
  react: {
    useSuspense: false,
  },
});

export const systemLanguage = initialLang;
export default i18n;
