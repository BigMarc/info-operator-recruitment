'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a href="/" className="text-2xl font-black text-black">
              Info<span className="text-accent">Operator</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a href="#about" className="text-gray-700 hover:text-black font-semibold transition">
              About Training
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-black font-semibold transition">
              Operator Stories
            </a>
            <a href="#book-call" className="text-gray-700 hover:text-black font-semibold transition">
              Apply Now
            </a>
            <a
              href="#book-call"
              className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
            >
              Get Started
            </a>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col space-y-4">
              <a 
                href="#about" 
                className="text-gray-700 hover:text-black font-semibold transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About Training
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-700 hover:text-black font-semibold transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Operator Stories
              </a>
              <a 
                href="#book-call" 
                className="text-gray-700 hover:text-black font-semibold transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </a>
              <a
                href="#book-call"
                className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
