import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n, { systemLanguage } from "../../../configs/translates/i18net";

const LANGUAGE_KEY = "APP_LANGUAGE";
const SUPPORTED_LANGUAGES = new Set(["en", "vi", "zh", "kr", "es"]);

export const normalizeAppLanguage = (lang?: string | null) => {
  const value = String(lang ?? "").trim().toLowerCase();

  if (value === "ko") return "kr";
  if (value === "cn") return "zh";
  if (SUPPORTED_LANGUAGES.has(value)) return value;

  return "en";
};

export const setAppLanguage = async (lang: string) => {
  try {
    const normalizedLang = normalizeAppLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, normalizedLang);
    await i18n.changeLanguage(normalizedLang);
    return normalizedLang;
  } catch (e) {
    console.error("Error setting language:", e);
    return "en";
  }
};

export const getAppLanguage = async (): Promise<string> => {
  try {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return normalizeAppLanguage(savedLang || systemLanguage || "en");
  } catch (e) {
    console.error("Error getting language:", e);
    return "en";
  }
};

export const applySavedLanguage = async (): Promise<string> => {
  const lang = await getAppLanguage();
  await i18n.changeLanguage(lang);
  return lang;
};
