export const appConfig = {
  // 基础配置
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  // 国际化配置
  i18n: {
    locales: ["en", "zh", "ja", "ko", "fr", "de", "es", "it", "pt", "ru", "ar", "hi", "tr", "pl", "uk"] as const,
    defaultLocale: "en" as const,
    localeLabels: {
      en: "English",
      zh: "简体中文",
      ja: "日本語",
      ko: "한국어",
      fr: "Français",
      de: "Deutsch",
      es: "Español",
      it: "Italiano",
      pt: "Português",
      ru: "Русский",
      ar: "العربية",
      hi: "हिन्दी",
      tr: "Türkçe",
      pl: "Polski",
      uk: "Українська"
    }
  }
};