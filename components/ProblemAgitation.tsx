'use client';

import { motion } from 'framer-motion';
import type { ProblemDict } from '@/dictionaries/types';

interface ProblemAgitationProps { dict: ProblemDict; }

export default function ProblemAgitation({ dict }: ProblemAgitationProps) {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
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
            {dict.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-6">
            {dict.headlineBefore}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              {dict.headlineAccent}
            </span>
            {dict.headlineAfter}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{dict.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.cards.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="bg-accent/5 rounded-2xl p-6 md:p-8 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-6">{point.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-accent-dark mb-4 leading-tight">{point.title}</h3>
              <p className="text-gray-700 leading-relaxed">{point.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
