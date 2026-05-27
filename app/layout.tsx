import { headers } from 'next/headers';
import { isValidLocale, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import { getDictionary } from '@/dictionaries';
import type { Metadata } from 'next';
import './globals.css';

function readLocale(): Locale {
  const headersList = headers();
  const candidate = headersList.get('x-locale') || '';
  return isValidLocale(candidate) ? candidate : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = readLocale();
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
    alternates: {
      languages: {
        de: 'https://buildforthem.de',
        en: 'https://buildforthem.com',
        'x-default': 'https://buildforthem.de',
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = readLocale();
  return (
    <html lang={locale}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
