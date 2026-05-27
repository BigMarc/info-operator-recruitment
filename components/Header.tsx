'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { NavDict, Locale, ModalDict } from '@/dictionaries/types';
import { otherLocale, PRODUCTION_DOMAINS } from '@/i18n/config';
import { localized } from '@/utils/route';
import TrainingCTA from './TrainingCTA';

interface HeaderProps {
  dict: NavDict;
  modalDict: ModalDict;
  locale: Locale;
}

export default function Header({ dict, modalDict, locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const switchTarget = otherLocale(locale);
  const switchHref = PRODUCTION_DOMAINS[switchTarget];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a href={localized('/', locale)} className="text-2xl font-black text-black">
              Build<span className="text-accent">ForThem</span>
            </a>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-6"
          >
            <a href="#methode" className="text-gray-700 hover:text-black font-semibold transition">{dict.methode}</a>
            <a href="#stories" className="text-gray-700 hover:text-black font-semibold transition">{dict.stories}</a>
            <a href="#faq" className="text-gray-700 hover:text-black font-semibold transition">{dict.faq}</a>
            <a
              href={switchHref}
              hrefLang={switchTarget}
              className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-accent border border-gray-300 hover:border-accent rounded-full px-3 py-1.5 transition"
            >
              {dict.switchTo}
            </a>
            <TrainingCTA
              locale={locale}
              dict={modalDict}
              source="header"
              className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
            >
              {dict.cta}
            </TrainingCTA>
          </motion.nav>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col space-y-4">
              <a href="#methode" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-black font-semibold transition">{dict.methode}</a>
              <a href="#stories" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-black font-semibold transition">{dict.stories}</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-black font-semibold transition">{dict.faq}</a>
              <a href={switchHref} hrefLang={switchTarget} className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-accent border border-gray-300 rounded-full px-3 py-1.5 transition w-fit">
                {dict.switchTo}
              </a>
              <TrainingCTA
                locale={locale}
                dict={modalDict}
                source="header-mobile"
                className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg text-center"
              >
                {dict.cta}
              </TrainingCTA>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
