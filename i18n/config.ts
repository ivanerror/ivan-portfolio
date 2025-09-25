export const locales = ['en', 'id', 'ms', 'th', 'vi', 'fil'] as const;
export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number];