'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { isValidLocale, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/dictionaries/types';
import { localized } from '@/utils/route';

export default function V4Page() {
  const params = useParams();
  const rawLocale = String(params?.locale ?? defaultLocale);
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale).v4;
  const [isVideoUnlocked, setIsVideoUnlocked] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href={localized('/', locale)} className="text-2xl font-black text-black">
              Build<span className="text-accent">ForThem</span>
            </a>
            <a
              href={localized('/', locale)}
              className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
            >
              {locale === 'de' ? 'Zurück zur Startseite' : 'Back to home'}
            </a>
          </div>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full border-2 border-accent/20 mb-8">
              <span className="text-accent font-bold text-lg">🎥</span>
              <span className="text-black font-bold text-lg">{dict.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-8 leading-tight">
              {dict.headlineBefore}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                {dict.headlineAccent}
              </span>{' '}
              {dict.headlineAfter}
            </h1>

            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              {dict.sub1}{' '}
              <span className="text-accent font-black text-2xl">{dict.highlightAmount}</span>{' '}
              {dict.sub2}{' '}
              <span className="text-accent font-black">{dict.highlight2}</span>
              {dict.sub3}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => setIsVideoUnlocked(true)}
                className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {dict.ctaPrimary}
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-accent/20 shadow-lg max-w-2xl mx-auto mb-16">
              <h3 className="text-lg font-bold text-black mb-2">{dict.secureBoxTitle}</h3>
              <p className="text-gray-600 text-sm">{dict.secureBoxBody}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {isVideoUnlocked && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-black mb-6">
                {dict.unlockedHeadlineBefore}{' '}
                <span className="text-accent">{dict.unlockedHeadlineAccent}</span>{' '}
                {dict.unlockedHeadlineAfter}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-black font-bold text-lg">{dict.videoTitle}</p>
                    <p className="text-gray-600 text-sm">{dict.videoSub}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {dict.steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (i + 1), duration: 0.8 }}
                  className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold text-xl">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.body}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <a
                href={localized('/v4/success', locale)}
                className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden inline-block"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {dict.unlockedCTA}
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </a>
            </div>
          </div>
        </motion.section>
      )}

      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-black mb-4">
            Build<span className="text-accent">ForThem</span>
          </div>
          <div className="text-sm text-gray-500 space-y-1">
            {dict.footerDisclaimers.map((d, i) => <p key={i}>{d}</p>)}
          </div>
        </div>
      </footer>
    </main>
  );
}
