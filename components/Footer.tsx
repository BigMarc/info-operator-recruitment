'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
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
            <p className="text-gray-300 mb-6 max-w-md">
              Wir bilden Growth Partners aus, die das Backend für etablierte Content Creator bauen.
              Komplette Ausbildung, Creator-Matching und laufende Unterstützung.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:info@tgn-media.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition" aria-label="E-Mail">
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
            <h4 className="text-lg font-bold text-white mb-4">Links</h4>
            <ul className="space-y-3">
              <li><a href="#methode" className="text-gray-300 hover:text-accent transition">Methode</a></li>
              <li><a href="#stories" className="text-gray-300 hover:text-accent transition">Operator-Stories</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-accent transition">FAQ</a></li>
              <li><a href="/v4" className="text-gray-300 hover:text-accent transition">Kostenloses Training</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Rechtliches</h4>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-gray-300 hover:text-accent transition">Datenschutz</a></li>
              <li><a href="/agb" className="text-gray-300 hover:text-accent transition">AGB</a></li>
              <li><a href="/disclosure" className="text-gray-300 hover:text-accent transition">Impressum</a></li>
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
              <h4 className="text-lg font-bold text-white mb-4">TGN Media LLC</h4>
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
              <h4 className="text-lg font-bold text-white mb-4">5K-Garantie</h4>
              <p className="text-gray-300">
                Verdienst du in 90 Tagen nicht mindestens 5.000 € mit deinem ersten Creator-Kunden,
                bekommst du 100 % deiner Ausbildungsgebühr zurück. Schriftlich. Ohne Wenn und Aber.
              </p>
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
            © 2026 TGN Media LLC. Alle Rechte vorbehalten. |
            <span className="text-accent font-semibold"> Growth Partner Ausbildung</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
