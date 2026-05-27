import type { Locale } from '@/dictionaries/types';

export const locales: Locale[] = ['de', 'en'];
export const defaultLocale: Locale = 'de';

export function isValidLocale(s: string): s is Locale {
  return (locales as readonly string[]).includes(s);
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'de' ? 'en' : 'de';
}

export const PRODUCTION_DOMAINS: Record<Locale, string> = {
  de: 'https://buildforthem.de',
  en: 'https://buildforthem.com',
};
