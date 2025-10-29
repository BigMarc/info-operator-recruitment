'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function V1Page() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
  };

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
      <section className="py-20">
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
              How to make{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
                $10–20k per month
              </span>
              <br />
              consistently as a "Creator Partner" with just one client
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Discover the 4-step framework:<br />
              I'll show you how I generated over <span className="text-accent font-bold">€100,000 profit</span> in a single month and how you can replicate it step by step.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="#video-training"
                className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Watch Video Training Now
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                <span>100% Free Access</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                <span>Instant Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Training Section */}
      <section id="video-training" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
              With these <span className="text-accent">4 steps</span> I scaled to 106k as a Growth Partner...
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Get instant access to the complete video training that reveals the exact framework I used to generate over €100,000 in profit with just one client.
            </p>
          </motion.div>

          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-black font-bold text-lg">Free Video Training</p>
                  <p className="text-gray-600 text-sm">Replace with your actual video URL</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Email Capture Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 border-2 border-accent/20 shadow-xl">
              <h3 className="text-2xl font-bold text-black mb-4 text-center">
                Get FREE Access to the Video Training
              </h3>
              <p className="text-gray-700 mb-6 text-center">
                Enter your email below to unlock the complete 4-step framework video training.
              </p>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-accent focus:outline-none text-lg"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
                  >
                    Unlock Video Training Now
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-black mb-2">Success!</h4>
                  <p className="text-gray-700">
                    Check your email for access to the video training.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Framework Steps Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
              The 4-Step Framework You'll Learn
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              These are the exact steps I used to generate over €100,000 in profit with just one client.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Client Acquisition",
                description: "How to find and attract high-value clients who are ready to invest in their business growth."
              },
              {
                step: "2", 
                title: "Offer Creation",
                description: "The exact framework for creating irresistible offers that clients can't say no to."
              },
              {
                step: "3",
                title: "Sales System",
                description: "The proven sales process that converts prospects into paying clients consistently."
              },
              {
                step: "4",
                title: "Scale & Automate",
                description: "How to scale your operations and automate processes to maximize profits."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 text-center">{item.title}</h3>
                <p className="text-gray-700 text-sm text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-accent/10 via-white to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
              Ready to Start Making $10–20k Per Month?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Get instant access to the complete video training and start implementing the 4-step framework today.
            </p>
            <a
              href="#video-training"
              className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden inline-block"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Free Access Now
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-black mb-4">
              Build<span className="text-accent">ForThem</span>
            </div>
            <p className="text-gray-400 mb-4">
              Helping creators build sustainable, high-margin businesses.
            </p>
            <div className="text-sm text-gray-500">
              © 2024 BuildForThem. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}