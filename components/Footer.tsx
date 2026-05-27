'use client';

import { motion } from 'framer-motion';
import type { FooterDict, Locale } from '@/dictionaries/types';
import { localized } from '@/utils/route';

interface FooterProps {
  dict: FooterDict;
  locale: Locale;
}

export default function Footer({ dict, locale }: FooterProps) {
  // German uses the existing flat /agb route; English uses /terms.
  const termsHref = locale === 'de' ? '/agb' : localized('/terms', locale);

  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-black text-white mb-4">
              Build<span className="text-accent">ForThem</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">{dict.tagline}</p>
            <div className="flex space-x-4">
              <a href="mailto:info@tgn-media.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition" aria-label="Email">
                <span className="text-white">📧</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">{dict.linksHeading}</h4>
            <ul className="space-y-3">
              <li><a href="#methode" className="text-gray-300 hover:text-accent transition">{dict.linkMethode}</a></li>
              <li><a href="#stories" className="text-gray-300 hover:text-accent transition">{dict.linkStories}</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-accent transition">{dict.linkFAQ}</a></li>
              <li><a href={localized('/v4', locale)} className="text-gray-300 hover:text-accent transition">{dict.linkV4}</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">{dict.legalHeading}</h4>
            <ul className="space-y-3">
              <li><a href={localized('/privacy', locale)} className="text-gray-300 hover:text-accent transition">{dict.linkPrivacy}</a></li>
              <li><a href={termsHref} className="text-gray-300 hover:text-accent transition">{dict.linkTerms}</a></li>
              <li><a href={localized('/disclosure', locale)} className="text-gray-300 hover:text-accent transition">{dict.linkDisclosure}</a></li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-white mb-4">{dict.companyHeading}</h4>
              <div className="text-gray-300 space-y-2">
                <p>1309 Coffeen Avenue STE 1200</p>
                <p>Sheridan, Wyoming 82801</p>
                <p>United States of America</p>
                <p className="mt-4">
                  <a href="mailto:info@tgn-media.com" className="text-accent hover:text-accent-light transition">
                    info@tgn-media.com
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">{dict.guaranteeHeading}</h4>
              <p className="text-gray-300">{dict.guaranteeBody}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400">
            {dict.copyright} | <span className="text-accent font-semibold"> Growth Partner</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
