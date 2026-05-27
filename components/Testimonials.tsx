'use client';

import { motion } from 'framer-motion';
import type { TestimonialsDict } from '@/dictionaries/types';

interface TestimonialsProps { dict: TestimonialsDict; }

export default function Testimonials({ dict }: TestimonialsProps) {
  return (
    <section id="stories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider">
            {dict.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            {dict.headlineBefore}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              {dict.headlineAccent}
            </span>{' '}
            {dict.headlineAfter}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{dict.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {dict.items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="text-lg font-bold text-black">{t.name}</h4>
                  <p className="text-gray-600 text-sm">{t.background}</p>
                  <p className="text-accent font-semibold text-sm">{t.clients} {dict.clientsLabel}</p>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic flex-grow">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">{dict.resultLabel}</span>
                  <span className="text-accent font-bold text-lg">{t.result}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">{dict.beforeLabel} {t.before}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-gray-700 font-semibold">{t.after}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border-2 border-accent/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {dict.aggregate.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-black text-accent mb-2">{s.value}</div>
                <div className="text-black font-bold text-sm">{s.label}</div>
                <div className="text-gray-600 text-xs mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
