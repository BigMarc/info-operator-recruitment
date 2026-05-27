import { notFound } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import LegalPage from '@/components/LegalPage';

export default function Page({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  return (
    <LegalPage
      locale={locale}
      title={dict.legal.privacy.title}
      bodyMarkdown={dict.legal.privacy.bodyMarkdown}
      backLabel={dict.success.backToHome}
    />
  );
}
