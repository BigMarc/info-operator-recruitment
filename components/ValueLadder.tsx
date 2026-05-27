'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    num: 1,
    title: 'Kostenloses Training (heute)',
    body: '60-Min Video. Methode, Geschäftsmodell, echte Zahlen. Kein Vorwissen nötig.',
    price: '0 €',
    cta: 'Training starten',
    href: '/v4',
    offset: 'lg:translate-y-12',
  },
  {
    num: 2,
    title: 'Strategie-Call (innerhalb 7 Tagen)',
    body: '30 Min Zoom. Wir prüfen, ob du passt. Du prüfst, ob wir passen.',
    price: '0 €',
    cta: 'Call buchen',
    href: '#kalender',
    offset: 'lg:translate-y-6',
  },
  {
    num: 3,
    title: 'Growth Partner Programm (4–6 Wochen)',
    body: 'Komplette Ausbildung + Matching mit deinem ersten Creator-Kunden. Investition wird im Call besprochen — durch die 5K-Garantie abgesichert.',
    price: 'Im Call',
    cta: 'Mehr im Call',
    href: '#kalender',
    offset: 'lg:translate-y-0',
  },
];

export default function ValueLadder() {
  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 via-white to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            Dein Weg
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">3 Schritte.</span>
            <br />
            Vom Klick bis zum ersten Creator-Kunden.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className={`${step.offset} bg-white rounded-2xl p-8 border-2 border-accent/20 shadow-xl hover:shadow-2xl transition-all flex flex-col`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-accent text-black font-black text-2xl flex items-center justify-center shadow-lg">
                  {step.num}
                </div>
                <div className="text-right ml-auto">
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Preis</div>
                  <div className="text-xl font-black text-accent">{step.price}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3 leading-snug">{step.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-6 flex-grow">{step.body}</p>
              <a
                href={step.href}
                className="inline-flex items-center justify-center gap-2 bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg"
              >
                {step.cta} →
              </a>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/v4"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all transform hover:scale-105"
          >
            Schritt 1 starten
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
