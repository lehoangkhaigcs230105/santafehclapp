import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../configs/translates/i18net";

const LANGUAGE_KEY = "APP_LANGUAGE";

export const setAppLanguage = async (lang: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    await i18n.changeLanguage(lang);
  } catch (e) {
    console.error("Error setting language:", e);
  }
};

export const getAppLanguage = async (): Promise<string> => {
  try {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return savedLang || "en";
  } catch (e) {
    console.error("Error getting language:", e);
    return "en";
  }
};