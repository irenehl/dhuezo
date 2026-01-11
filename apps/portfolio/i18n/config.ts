export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]

// Default site locale set to English; language toggle will offer the other locale
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
}


