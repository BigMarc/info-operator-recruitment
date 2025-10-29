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
            Ready To Become a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Growth Partner?
            </span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Book a free 30-minute strategy call where we'll discuss the training program, 
            client matching process, and earning potential for Growth Partners.
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
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-black mb-4 text-center">Book Your Strategy Call</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Choose a time that works for you. We'll discuss the training program, 
                  client matching process, and how you can earn $5K-$20K+ per client.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <iframe 
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0PhisTFQ39uvL2tQkbo4U0xBOm5z5zUWQXHM6acjIAvomo6fxmFR7XjurJutBp3k0xSigSuQr3?gv=true" 
                  style={{border: 0}} 
                  width="100%" 
                  height="600" 
                  frameBorder="0"
                  title="Google Calendar Appointment Scheduling"
                ></iframe>
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
                  <p className="text-gray-700">Learn about our comprehensive Growth Partner training covering offer creation, funnels, and automation.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black mb-2">Client Matching Process</h4>
                  <p className="text-gray-700">Understand how we connect trained partners with vetted influencers who need Growth Partner services.</p>
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
                  <p className="text-gray-700">Get clarity on the application process, training timeline, and how to get started as a Growth Partner.</p>
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
