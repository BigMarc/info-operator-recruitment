'use client';

import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-white to-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main CTA */}
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Ready To Become a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Growth Partner?
            </span>
          </h2>
          
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join 50+ partners who've built successful practices. 
            Apply for our training program and get matched with influencer clients.
          </p>

          {/* Guarantee Reminder */}
          <div className="inline-flex items-center gap-2 bg-accent/20 px-8 py-4 rounded-full border-2 border-accent/30 mb-12">
            <span className="text-accent font-bold text-xl">💰</span>
              <span className="text-black font-bold text-lg">
                Remember: If you don't earn at least <span className="text-accent font-black">$5,000</span> from your first client within 90 days, 
                we'll refund your training investment <span className="text-accent font-black">100%</span>.
              </span>
            <span className="text-accent font-bold text-xl">💰</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
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
              href="#about"
              className="group px-8 py-6 border-2 border-black text-black hover:bg-black hover:text-white font-bold text-lg rounded-2xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Learn More About Training
              <span className="group-hover:translate-y-1 transition-transform">↓</span>
            </a>
          </div>

          {/* Urgency Section */}
          <div className="bg-white rounded-2xl p-8 border-2 border-accent/20 shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-accent text-3xl">⚡</span>
              <h3 className="text-2xl font-black text-black">Limited Spots Available This Month</h3>
              <span className="text-accent text-3xl">⚡</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-black text-accent mb-2">10</div>
                <div className="text-gray-700 font-semibold">New Operators</div>
                <div className="text-gray-600 text-sm">Per month maximum</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-black mb-2">7</div>
                <div className="text-gray-700 font-semibold">Spots Left</div>
                <div className="text-gray-600 text-sm">This month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-accent mb-2">4-6</div>
                <div className="text-gray-700 font-semibold">Weeks</div>
                <div className="text-gray-600 text-sm">Training duration</div>
              </div>
            </div>

            <p className="text-gray-700 text-center mb-6">
              We limit training cohorts to ensure personalized attention and quality client matching. 
              Don't miss your chance to start your Growth Partner career this month.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#book-call"
                className="bg-accent text-black px-8 py-4 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl text-center"
              >
                Apply Now →
              </a>
              <a
                href="mailto:info@tgn-media.com"
                className="border-2 border-accent text-accent px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-black transition text-center"
              >
                Email Us Directly
              </a>
            </div>
          </div>

          {/* Final Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
              <div className="text-4xl font-black text-accent mb-2">50+</div>
              <div className="text-black font-semibold">Trained Operators</div>
              <div className="text-gray-600 text-sm">Active graduates</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
              <div className="text-4xl font-black text-black mb-2">$1.2M+</div>
              <div className="text-black font-semibold">Earned by Operators</div>
              <div className="text-gray-600 text-sm">Revenue share</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
              <div className="text-4xl font-black text-accent mb-2">90%</div>
              <div className="text-black font-semibold">Success Rate</div>
              <div className="text-gray-600 text-sm">Get matched with clients</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
