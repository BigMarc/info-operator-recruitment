import { notFound } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { isValidLocale, locales } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemAgitation from '@/components/ProblemAgitation';
import Reframe from '@/components/Reframe';
import Method from '@/components/Method';
import Trainer from '@/components/Trainer';
import Testimonials from '@/components/Testimonials';
import ValueLadder from '@/components/ValueLadder';
import GuaranteeScarcity from '@/components/GuaranteeScarcity';
import FAQ from '@/components/FAQ';
import CalendarEmbed from '@/components/CalendarEmbed';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen">
      <Header dict={dict.nav} locale={locale} />
      <Hero dict={dict.hero} locale={locale} />
      <ProblemAgitation dict={dict.problem} />
      <Reframe dict={dict.reframe} />
      <Method dict={dict.method} />
      <Trainer dict={dict.trainer} locale={locale} />
      <Testimonials dict={dict.testimonials} />
      <ValueLadder dict={dict.ladder} locale={locale} />
      <GuaranteeScarcity dict={dict.guarantee} />
      <FAQ dict={dict.faq} />
      <CalendarEmbed dict={dict.calendar} />
      <Footer dict={dict.footer} locale={locale} />
    </main>
  );
}
