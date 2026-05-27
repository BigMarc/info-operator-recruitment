'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '50+', label: 'Aktive Growth Partners', sub: 'Im Netzwerk' },
  { value: '1,2 Mio. €+', label: 'An Partners ausgezahlt', sub: 'Revenue-Share', highlight: true },
  { value: '90 %', label: 'Vermittlungsquote', sub: 'Matching-Erfolg' },
  { value: '8 Jahre', label: 'Bewährtes System', sub: 'Seit 2018' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white pt-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-8 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            Growth Partner Ausbildung
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight tracking-tight">
            Gehalt ist die langsame Spur.
            <br />
            Werde Growth Partner und verdiene{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent inline-block">
              5.000–20.000 €
            </span>
            <br />
            pro Creator-Kunde.
          </h1>

          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-lg sm:text-xl md:text-2xl text-black mb-6 font-bold leading-relaxed">
              Wir bilden dich aus. Wir matchen dich mit geprüften Content Creators.
              Du baust ihr Backend — und kassierst Revenue-Share auf jeden Launch.
            </p>

            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-4 rounded-full border-2 border-accent/20 mb-2">
              <span className="text-accent font-bold text-lg">💰</span>
              <span className="text-black font-bold text-base sm:text-lg">
                <span className="text-accent font-black">5.000 €</span> in <span className="text-accent font-black">90 Tagen</span> oder <span className="text-accent font-black">100 %</span> Geld zurück — schriftlich garantiert.
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-10"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-black font-bold text-lg">60-Min Training ansehen</p>
                  <p className="text-gray-600 text-sm">Methode, Geschäftsmodell, echte Zahlen</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href="/v4"
              className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden glow-animation"
            >
              <span className="relative z-10 flex items-center gap-3">
                Kostenloses Training sichern
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </a>
            <a
              href="#methode"
              className="group px-8 py-6 border-2 border-black text-black hover:bg-black hover:text-white font-bold text-lg rounded-2xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Wie funktioniert das?
              <span className="group-hover:translate-y-1 transition-transform">↓</span>
            </a>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`text-3xl md:text-4xl font-black mb-2 ${stat.highlight ? 'text-accent' : 'text-black'}`}>
                  {stat.value}
                </div>
                <div className="text-black font-semibold text-sm">{stat.label}</div>
                <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
