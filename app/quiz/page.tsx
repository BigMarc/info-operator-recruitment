'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function QuizLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-accent/5">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="/" className="text-2xl font-black text-black">
              Build<span className="text-accent">ForThem</span>
            </a>
            <a
              href="/"
              className="text-gray-600 hover:text-black text-sm font-medium transition"
            >
              ← Zurück
            </a>
          </div>
        </div>
      </header>

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 px-5 py-2.5 rounded-full border-2 border-accent/20 mb-8">
              <span className="text-accent font-bold">⚡</span>
              <span className="text-black font-bold text-sm sm:text-base">2-Minuten-Quiz</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
              Passt das{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                Growth-Partner-Modell
              </span>{' '}
              zu dir?
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              4 kurze Fragen. Am Ende weißt du, ob das Modell zu deinem Leben passt —
              und ob wir der richtige Partner für dich sind.
            </p>

            <Link href="/quiz/q1">
              <motion.button
                className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-3">
                  Quiz starten
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </motion.button>
            </Link>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-10 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>100% kostenlos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Anonym</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Kein Verkaufsdruck</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-3">
              Über 150 ausgebildete Growth Partner
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wir bilden Growth Partner aus, die das Backend für etablierte Content Creator
              bauen — und im Schnitt 5.000 € pro Monat mit nur einem Kunden machen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { stat: '150+', label: 'Growth Partner ausgebildet' },
              { stat: '90 Tage', label: 'bis zum ersten 5K-Monat' },
              { stat: '5K', label: 'Garantie oder Geld zurück' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-accent/10"
              >
                <div className="text-3xl sm:text-4xl font-black text-accent mb-2">{item.stat}</div>
                <div className="text-sm text-gray-700">{item.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/quiz/q1">
              <motion.button
                className="bg-accent text-black px-10 py-5 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Quiz jetzt starten →
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
