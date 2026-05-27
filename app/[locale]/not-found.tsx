'use client';

import { useParams } from 'next/navigation';
import { isValidLocale, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import { localized } from '@/utils/route';

const COPY: Record<Locale, { title: string; sub: string; cta: string }> = {
  de: { title: 'Seite nicht gefunden', sub: 'Diese Seite existiert nicht oder wurde verschoben.', cta: 'Zur Startseite' },
  en: { title: 'Page not found', sub: "This page doesn't exist or has been moved.", cta: 'Back to home' },
};

export default function NotFound() {
  const params = useParams();
  const rawLocale = String(params?.locale ?? defaultLocale);
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const copy = COPY[locale];
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-accent mb-6">404</h1>
        <h2 className="text-2xl font-bold text-black mb-4">{copy.title}</h2>
        <p className="text-gray-700 mb-8">{copy.sub}</p>
        <a href={localized('/', locale)} className="inline-block bg-accent text-black px-8 py-4 rounded-full font-bold hover:bg-accent-dark transition shadow-lg">
          {copy.cta}
        </a>
      </div>
    </main>
  );
}
