'use client';

import { motion } from 'framer-motion';

const NEXT_STEPS = [
  {
    num: 1,
    title: 'Schau dir das Training in Ruhe an',
    body: 'Nimm dir 60 Minuten — am besten ohne Ablenkung. Du lernst die komplette Methode, das Geschäftsmodell und die echten Zahlen.',
  },
  {
    num: 2,
    title: 'Buche deinen Strategie-Call',
    body: 'Wenn du nach dem Training spürst, dass das Modell zu dir passt, buche direkt den nächsten Schritt: 30 Minuten Zoom mit unserem Team.',
  },
  {
    num: 3,
    title: 'Werde gematcht',
    body: 'Im Call entscheiden wir gemeinsam, ob du in die nächste Kohorte passt. Wenn ja: wir matchen dich nach der Ausbildung mit deinem ersten Creator-Kunden.',
  },
];

export default function V4SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="/" className="text-2xl font-black text-black">
              Build<span className="text-accent">ForThem</span>
            </a>
            <a
              href="/"
              className="text-gray-700 hover:text-black font-semibold transition"
            >
              ← Zurück zur Startseite
            </a>
          </div>
        </div>
      </header>

      {/* Hero — Confirmation */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Success badge */}
            <div className="inline-flex items-center gap-3 bg-accent/10 px-8 py-4 rounded-full border-2 border-accent/30 mb-8">
              <span className="text-3xl">✅</span>
              <span className="text-black font-black text-lg">Dein Training ist freigeschaltet</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
              Willkommen, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">Growth Partner</span> in spe.
            </h1>

            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Du hast den ersten Schritt gemacht. In den nächsten 60 Minuten lernst du,
              wie das Growth-Partner-Modell funktioniert — und wie du daraus deine erste
              Revenue-Share-Beteiligung mit einem Creator baust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
              Die nächsten Schritte
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
              Was jetzt passiert
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-3xl mx-auto mb-12">
            {NEXT_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex items-start gap-5 bg-gray-50 rounded-2xl p-6 border-2 border-accent/10"
              >
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-black text-lg">{step.num}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strong CTA — book the call */}
      <section className="py-20 bg-gradient-to-br from-accent/5 via-white to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-black mb-6 leading-tight">
              Bereit für Schritt 2?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                Buche jetzt deinen Strategie-Call.
              </span>
            </h2>
            <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
              30 Minuten Zoom. Wir prüfen, ob die Ausbildung zu dir passt — und du
              prüfst, ob wir zu dir passen.
            </p>

            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full border-2 border-accent/20 mb-8">
              <span className="text-accent text-lg">⚡</span>
              <span className="text-black font-bold">Nur noch 7 von 10 Plätzen in der nächsten Kohorte</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/#kalender"
                className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 glow-animation"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Strategie-Call buchen
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </a>
              <a
                href="mailto:info@tgn-media.com"
                className="px-8 py-6 border-2 border-black text-black hover:bg-black hover:text-white font-bold text-lg rounded-2xl transition-all"
              >
                Lieber per E-Mail
              </a>
            </div>

            <p className="mt-10 text-sm text-gray-500">
              5.000 € in 90 Tagen oder 100 % Geld zurück — schriftlich garantiert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-black mb-4">
            Build<span className="text-accent">ForThem</span>
          </div>
          <p className="text-gray-400 mb-4">
            Growth Partner Ausbildung — TGN Media LLC
          </p>
          <p className="text-sm text-gray-500">
            <a href="/privacy" className="text-accent hover:underline">Datenschutz</a>
            {' · '}
            <a href="/terms" className="text-accent hover:underline">AGB</a>
            {' · '}
            <a href="/disclosure" className="text-accent hover:underline">Impressum</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
