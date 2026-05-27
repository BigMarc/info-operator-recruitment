'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '50+', label: 'Aktive Growth Partners', sub: 'Vertrauen bereits auf das System' },
  { value: '4 Schritte', label: 'Erprobte Methode', sub: 'Bewährt seit 2018' },
  { value: 'Komplett', label: 'Alle Tools inklusive', sub: 'Vorlagen, Funnels, Skripte, Verträge' },
  { value: '90 Tage', label: 'Bis zum ersten Kunden', sub: 'Bis 5K-Garantie greift' },
];

const STEPS = [
  { num: 1, title: 'System lernen', body: 'Komplette Ausbildung: Offer-Creation, Funnels, Automation, Launches.' },
  { num: 2, title: 'Werkzeuge meistern', body: 'Hands-on mit unseren Vorlagen, Skripten und Plattformen.' },
  { num: 3, title: 'Mit Creator gematcht', body: 'Wir verbinden dich mit geprüften Influencern, die einen Growth Partner brauchen.' },
  { num: 4, title: 'Revenue-Share kassieren', body: '20–50 % vom Umsatz, den du erzeugst. Ohne Decke.' },
];

export default function Method() {
  return (
    <section id="methode" className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            Die Methode
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Was ist die{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Growth Partner Methode
            </span>
            ?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-2xl border-2 border-accent/10 overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Ein <strong className="text-black">4-Schritte-System</strong>, das jemanden ohne eigene Kundenbasis zum festen Backend-Operator für etablierte Content Creator macht.
              </p>
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                Lernzeit: <strong>4–6 Wochen</strong>. Danach matchen wir dich mit deinen ersten zahlenden Creator-Kunden.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {['MS', 'JR', 'EK', 'DM'].map((initials) => (
                    <div
                      key={initials}
                      className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center text-xs font-bold border-2 border-white"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Über <strong className="text-accent">50+ Zufriedene</strong> Growth Partners
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-[300px] lg:min-h-full flex items-center justify-center p-8">
              <img
                src="/marc-schultheiss.jpg"
                alt="Marc Schultheiss — Growth Partner Trainer"
                className="rounded-2xl shadow-xl w-full max-w-sm object-cover aspect-square"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-white rounded-2xl p-6 border-2 border-accent/10 shadow-lg text-center"
            >
              <div className="text-2xl md:text-3xl font-black text-accent mb-2">{stat.value}</div>
              <div className="text-black font-bold text-sm mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STEPS.map((step) => (
            <div key={step.num} className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-black text-lg">{step.num}</span>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.body}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
