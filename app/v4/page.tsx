'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function V4Page() {
  const [isVideoUnlocked, setIsVideoUnlocked] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="/" className="text-2xl font-black text-black">
              Build<span className="text-accent">ForThem</span>
            </a>
            <a
              href="/"
              className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full border-2 border-accent/20 mb-8">
              <span className="text-accent font-bold text-lg">🎥</span>
              <span className="text-black font-bold text-lg">Free Video Training</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-8 leading-tight">
              How to make{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                $10–20k per month
              </span>{' '}
              consistently as a "Creator Partner" with just one client.
            </h1>

            {/* Subheadline */}
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-8">
              Discover the 4-step framework:
            </h2>

            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              I'll show you how I generated over{' '}
              <span className="text-accent font-black text-2xl">€100,000 profit</span>{' '}
              in a single month and how you can replicate it{' '}
              <span className="text-accent font-black">step by step with AI</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => setIsVideoUnlocked(true)}
                className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Watch Video Training Now
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>

            {/* Secure Access Reminder */}
            <div className="bg-white rounded-2xl p-6 border-2 border-accent/20 shadow-lg max-w-2xl mx-auto mb-16">
              <h3 className="text-lg font-bold text-black mb-2">
                🔒 Secure your FREE access to the video training
              </h3>
              <p className="text-gray-600 text-sm">
                Limited time access - No payment required
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Training Content */}
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
                With these <span className="text-accent">4 steps</span> I scaled to 106k as an Info-Operator...
              </h2>
            </div>

            {/* Video Embed */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-black font-bold text-lg">Video Training</p>
                    <p className="text-gray-600 text-sm">Replace with your actual video URL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Step Framework */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">Client Acquisition</h3>
                <p className="text-gray-600 text-sm">Find and attract high-value clients who need your services</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">Offer Creation</h3>
                <p className="text-gray-600 text-sm">Develop irresistible offers that solve real problems</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">AI Automation</h3>
                <p className="text-gray-600 text-sm">Leverage AI tools to scale your operations efficiently</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">4</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">Profit Scaling</h3>
                <p className="text-gray-600 text-sm">Scale to consistent 5-figure monthly income</p>
              </motion.div>
            </div>

            {/* Additional CTA */}
            <div className="text-center">
              <a
                href="#book-call"
                className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden inline-block"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Unlock Video Training
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            </div>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-black mb-4">
              Build<span className="text-accent">ForThem</span>
            </div>
            <p className="text-gray-400 mb-4">
              Turn Creator Audiences Into Revenue
            </p>
            <div className="text-sm text-gray-500">
              <p>NOT FACEBOOK: This site is not a part of the Facebook website or Facebook Inc.</p>
              <p>NOT GOOGLE: This site is not a part of the Google website or Google Inc.</p>
              <p className="mt-4">Copyrights by BuildForThem ™ 2024 | <a href="/privacy" className="text-accent hover:underline">Privacy</a> | <a href="/terms" className="text-accent hover:underline">Terms</a></p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
