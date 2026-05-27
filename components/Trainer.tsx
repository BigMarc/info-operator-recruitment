'use client';

import { motion } from 'framer-motion';
import type { TrainerDict, Locale, ModalDict } from '@/dictionaries/types';
import FormattedText from './FormattedText';
import TrainingCTA from './TrainingCTA';

interface TrainerProps {
  dict: TrainerDict;
  modalDict: ModalDict;
  locale: Locale;
}

export default function Trainer({ dict, modalDict, locale }: TrainerProps) {
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
            {dict.headlineBefore}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              {dict.headlineAccent}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{dict.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 rounded-2xl overflow-hidden shadow-2xl border-2 border-accent/10 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-4xl font-black text-accent mb-6">{dict.name}</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                <FormattedText text={dict.intro} strongClassName="text-black font-bold" />
              </p>
              <div className="space-y-5">
                {dict.credentials.map((c) => (
                  <div key={c.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{c.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-black mb-1">{c.title}</h4>
                      <p className="text-gray-600 text-sm">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative bg-black min-h-[400px] lg:min-h-full">
              <img
                src="/marc-schultheiss.jpg"
                alt={dict.name}
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-lg italic leading-relaxed mb-3 border-l-4 border-accent pl-4">
                  &ldquo;{dict.quote}&rdquo;
                </p>
                <p className="text-accent font-bold text-xl pl-4">{dict.quoteAttribution}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <TrainingCTA
            locale={locale}
            dict={modalDict}
            source="trainer"
            className="inline-flex items-center gap-3 bg-accent text-black px-10 py-5 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-accent-dark transition-all transform hover:scale-105"
          >
            {dict.cta}
            <span>→</span>
          </TrainingCTA>
        </div>
      </div>
    </section>
  );
}
