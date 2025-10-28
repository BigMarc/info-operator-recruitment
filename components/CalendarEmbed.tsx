'use client';

import { motion } from 'framer-motion';

export default function CalendarEmbed() {
  return (
    <section id="book-call" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Ready To Become an{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Info Operator?
            </span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Book a free 30-minute strategy call where we'll discuss the training program, 
            client matching process, and earning potential for Info Operators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Calendar Embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-accent/10">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                  </div>
                  <p className="text-black font-bold text-lg">Google Calendar</p>
                  <p className="text-gray-600 text-sm">Replace with your calendar embed URL</p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-black mb-4">Book Your Strategy Call</h3>
                <p className="text-gray-600 mb-6">
                  Choose a time that works for you. We'll discuss the training program, 
                  client matching process, and how you can earn $5K-$20K+ per client.
                </p>
                <a
                  href="#"
                  className="inline-block bg-accent text-black px-8 py-4 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
                >
                  Select Time Slot →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-3xl font-black text-black mb-8">
              What You'll Learn From This Call:
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black mb-2">Training Program Overview</h4>
                  <p className="text-gray-700">Learn about our comprehensive Info Operator training covering offer creation, funnels, and automation.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black mb-2">Client Matching Process</h4>
                  <p className="text-gray-700">Understand how we connect trained operators with vetted influencers who need Info Operator services.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black mb-2">Earning Potential</h4>
                  <p className="text-gray-700">Discover how operators earn $5K-$20K+ per client with 20-50% revenue share arrangements.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black mb-2">Next Steps</h4>
                  <p className="text-gray-700">Get clarity on the application process, training timeline, and how to get started as an Info Operator.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-accent text-2xl">⚡</span>
                <h4 className="text-xl font-bold text-black">Limited Spots Available</h4>
              </div>
              <p className="text-gray-700">
                We only accept 10 new operators per month to ensure quality training and client matching. 
                Book your call now to secure your spot in the next training cohort.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
