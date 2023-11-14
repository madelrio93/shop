export const i18nConfig = {
    locales: ["es"],
    defaultLocale: "es",
  };
  
  const translations = {
       es: () => import("./translations/es.json").then((module) => module.default),
  };
  
  export type Locale = (typeof i18nConfig)["locales"][number];
  
  export const getTranslation = async (locale: Locale) =>
    translations[locale as keyof typeof translations]?.() ?? translations.es();