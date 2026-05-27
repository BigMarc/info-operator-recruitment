'use client';

import { motion } from 'framer-motion';
import type { LadderDict, Locale, ModalDict } from '@/dictionaries/types';
import { localized } from '@/utils/route';
import TrainingCTA from './TrainingCTA';

interface ValueLadderProps {
  dict: LadderDict;
  modalDict: ModalDict;
  locale: Locale;
}

const OFFSETS = ['lg:translate-y-12', 'lg:translate-y-6', 'lg:translate-y-0'];

export default function ValueLadder({ dict, modalDict, locale }: ValueLadderProps) {
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
            {dict.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">{dict.headlineAccent}</span>
            <br />
            {dict.headlineRest}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {dict.steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className={`${OFFSETS[i] ?? ''} bg-white rounded-2xl p-8 border-2 border-accent/20 shadow-xl hover:shadow-2xl transition-all flex flex-col`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-accent text-black font-black text-2xl flex items-center justify-center shadow-lg">
                  {step.num}
                </div>
                <div className="text-right ml-auto">
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{dict.priceLabel}</div>
                  <div className="text-xl font-black text-accent">{step.price}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3 leading-snug">{step.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-6 flex-grow">{step.body}</p>
              {step.href === '/v4' ? (
                <TrainingCTA
                  locale={locale}
                  dict={modalDict}
                  source={`ladder-step${step.num}`}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg"
                >
                  {step.cta} →
                </TrainingCTA>
              ) : (
                <a
                  href={localized(step.href, locale)}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg"
                >
                  {step.cta} →
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <TrainingCTA
            locale={locale}
            dict={modalDict}
            source="ladder-primary"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all transform hover:scale-105"
          >
            {dict.ctaPrimary}
            <span>→</span>
          </TrainingCTA>
        </div>
      </div>
    </section>
  );
}
