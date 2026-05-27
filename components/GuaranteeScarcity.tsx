'use client';

import { motion } from 'framer-motion';
import type { GuaranteeDict } from '@/dictionaries/types';
import FormattedText from './FormattedText';

interface GuaranteeScarcityProps { dict: GuaranteeDict; }

export default function GuaranteeScarcity({ dict }: GuaranteeScarcityProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">{dict.headlineAccent}</span>
            <br />
            {dict.headlineRest}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-accent to-accent-dark text-black rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl"
          >
            <div className="text-5xl mb-4">{dict.guarantee.icon}</div>
            <h3 className="text-2xl sm:text-3xl font-black mb-4">{dict.guarantee.title}</h3>
            <p className="text-black/90 leading-relaxed text-lg">
              <FormattedText text={dict.guarantee.body} strongClassName="font-bold" />
            </p>
            <p className="text-black/80 mt-4 font-semibold">{dict.guarantee.footer}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-accent/30"
          >
            <div className="text-5xl mb-4">{dict.scarcity.icon}</div>
            <h3 className="text-2xl sm:text-3xl font-black mb-4">
              <span className="text-accent">{dict.scarcity.titleAccent}</span> {dict.scarcity.titleRest}
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              <FormattedText text={dict.scarcity.body} strongClassName="text-white font-bold" />
            </p>
            <p className="text-gray-400 mt-4 font-semibold">{dict.scarcity.footer}</p>
          </motion.div>
        </div>

        <div className="text-center">
          <a
            href="#kalender"
            className="inline-flex items-center justify-center gap-3 bg-accent text-black w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 rounded-2xl font-black text-base sm:text-lg md:text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 glow-animation"
          >
            {dict.cta}
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
