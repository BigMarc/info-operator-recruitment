'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
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
              Training aspiring Growth Partners to help content creators launch successful info products. 
              Comprehensive training, client matching, and ongoing support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition">
                <span className="text-white">📧</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition">
                <span className="text-white">📱</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition">
                <span className="text-white">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition">
                <span className="text-white">📘</span>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-300 hover:text-accent transition">About Training</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-accent transition">Operator Stories</a></li>
              <li><a href="#book-call" className="text-gray-300 hover:text-accent transition">Apply Now</a></li>
              <li><a href="#social-proof" className="text-gray-300 hover:text-accent transition">Success Stats</a></li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-gray-300 hover:text-accent transition">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-accent transition">Terms of Service</a></li>
              <li><a href="/disclosure" className="text-gray-300 hover:text-accent transition">Disclosure</a></li>
            </ul>
          </motion.div>
        </div>

        {/* Company Info */}
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
              <h4 className="text-lg font-bold text-white mb-4">Training Guarantee</h4>
              <p className="text-gray-300">
                If you don't earn at least $5,000 from your first client within 90 days, 
                we'll refund your training investment 100%. No questions asked.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400">
            © 2024 TGN Media LLC. All rights reserved. | 
            <span className="text-accent font-semibold"> Growth Partner Training Program</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
