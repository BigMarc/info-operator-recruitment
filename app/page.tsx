import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CalendarEmbed from '@/components/CalendarEmbed';
import SocialProof from '@/components/SocialProof';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CalendarEmbed />
      <SocialProof />
      <About />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
