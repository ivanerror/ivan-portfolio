import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type AppLocale = (typeof routing.locales)[number];

const isAppLocale = (value: unknown): value is AppLocale => {
  return typeof value === 'string' && routing.locales.some((locale) => locale === value);
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: AppLocale = isAppLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
