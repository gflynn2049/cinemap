import i18n from "i18next";
import enTranslation from "./lang/en.json";
import zhTranslation from "./lang/zh.json";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: enTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
