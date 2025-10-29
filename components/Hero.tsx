'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white pt-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight tracking-tight">
            How Content Creators Make{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent inline-block">
              $10K-$50K+
            </span>
            <br />
            <span className="text-black">Per Product Launch</span>
          </h1>

          {/* Subheadline with Offer */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg sm:text-xl md:text-2xl text-black mb-6 font-bold leading-relaxed">
              How to make $10–20k per month consistently as a "Creator Partner" with just one client.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
              Discover the 4-step framework:<br />
              I'll show you how I generated over €100,000 profit in a single month and how you can replicate it step by step.
            </p>
            
            {/* Guarantee */}
            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-4 rounded-full border-2 border-accent/20 mb-8">
              <span className="text-accent font-bold text-lg">💰</span>
              <span className="text-black font-bold text-lg">
                If you don't earn at least <span className="text-accent font-black">$5,000</span> from <span className="text-accent font-black">your first client</span> within 90 days, we'll refund your training investment <span className="text-accent font-black">100%</span>. No questions asked.
              </span>
              <span className="text-accent font-bold text-lg">💰</span>
            </div>
          </div>

          {/* Video Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-10"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-black font-bold text-lg">Watch The Training Overview</p>
                  <p className="text-gray-600 text-sm">See how our Growth Partners earn $5K-$20K+ per client</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href="#book-call"
              className="group relative bg-accent text-black px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,178,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,178,0,0.5)] transition-all transform hover:scale-105 overflow-hidden glow-animation"
            >
              <span className="relative z-10 flex items-center gap-3">
                Apply for Training Program
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
            <a
              href="#video"
              className="group px-8 py-6 border-2 border-black text-black hover:bg-black hover:text-white font-bold text-lg rounded-2xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Learn About the Opportunity
              <span className="group-hover:translate-y-1 transition-transform">↓</span>
            </a>
          </motion.div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-5xl font-black text-black mb-2">50+</div>
              <div className="text-black font-semibold">Trained Partners</div>
              <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider">Active in Program</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-5xl font-black text-accent mb-2">$1.2M+</div>
              <div className="text-black font-semibold">Earned by Partners</div>
              <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider">Revenue Share</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-5xl font-black text-black mb-2">$12K</div>
              <div className="text-black font-semibold">Average Earnings</div>
              <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider">Per Client</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
