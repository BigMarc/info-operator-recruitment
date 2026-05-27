'use client';

import { motion } from 'framer-motion';

const PAIN_POINTS = [
  {
    icon: '💸',
    title: 'Abhängig von einem einzigen Gehalt',
    body: 'Du tauschst Zeit gegen Geld. Wenn du nicht arbeitest, verdienst du nichts. Eine Kündigung — und alles ist weg.',
  },
  {
    icon: '⚙️',
    title: 'Skills, aber keine Kunden',
    body: 'Du kannst Marketing, Funnels oder Verkauf. Aber wer bezahlt dich dafür? Cold Outreach kostet Monate ohne Garantie.',
  },
  {
    icon: '📉',
    title: 'Angst vor dem Sprung ins Nichts',
    body: 'Selbstständigkeit ohne Sicherheit klingt wie Roulette. Du willst springen — aber nicht ohne Netz.',
  },
];

export default function ProblemAgitation() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            Die Situation
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Fühlst du dich beruflich{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              ausgebremst
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Drei Sackgassen kennt fast jeder, der mehr will als sein Gehalt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="bg-accent/5 rounded-2xl p-8 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-6">{point.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-accent-dark mb-4 leading-tight">
                {point.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{point.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
