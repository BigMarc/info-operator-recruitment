import { getDictionary } from '@/dictionaries';
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

export default function Home() {
  const dict = getDictionary('de');
  const locale = 'de' as const;
  return (
    <main className="min-h-screen">
      <Header dict={dict.nav} locale={locale} />
      <Hero dict={dict.hero} locale={locale} />
      <ProblemAgitation dict={dict.problem} />
      <Reframe dict={dict.reframe} />
      <Method dict={dict.method} />
      <Trainer dict={dict.trainer} locale={locale} />
      <Testimonials />
      <ValueLadder />
      <GuaranteeScarcity />
      <FAQ />
      <CalendarEmbed />
      <Footer />
    </main>
  );
}
