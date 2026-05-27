'use client';

import { motion } from 'framer-motion';

export default function GuaranteeScarcity() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">Maximal abgesichert.</span>
            <br />
            Minimal verfügbar.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-accent to-accent-dark text-black rounded-2xl p-8 md:p-10 shadow-2xl"
          >
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-3xl font-black mb-4">5.000 € in 90 Tagen</h3>
            <p className="text-black/90 leading-relaxed text-lg">
              Verdienst du in 90 Tagen nicht mindestens <strong>5.000 €</strong> mit deinem ersten Creator-Kunden,
              bekommst du <strong>100 % deiner Ausbildungsgebühr zurück</strong>.
            </p>
            <p className="text-black/80 mt-4 font-semibold">
              Schriftlich. Ohne Wenn und Aber.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 md:p-10 shadow-2xl border-2 border-accent/30"
          >
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-3xl font-black mb-4">
              <span className="text-accent">7 von 10</span> Plätzen verfügbar
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Wir nehmen maximal <strong className="text-white">10 neue Growth Partners</strong> pro Monat auf —
              damit jeder gematcht wird.
            </p>
            <p className="text-gray-400 mt-4 font-semibold">
              Aktuelle Kohorte startet in 14 Tagen.
            </p>
          </motion.div>
        </div>

        <div className="text-center">
          <a
            href="#kalender"
            className="inline-flex items-center gap-3 bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 glow-animation"
          >
            Platz sichern
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
