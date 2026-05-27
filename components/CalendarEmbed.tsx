'use client';

import { motion } from 'framer-motion';
import type { CalendarDict } from '@/dictionaries/types';

interface CalendarEmbedProps { dict: CalendarDict; }

export default function CalendarEmbed({ dict }: CalendarEmbedProps) {
  return (
    <section id="kalender" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-accent/5 via-white to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-4">
            {dict.headlineLine1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              {dict.headlineLine2Accent}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{dict.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-accent/10">
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0PhisTFQ39uvL2tQkbo4U0xBOm5z5zUWQXHM6acjIAvomo6fxmFR7XjurJutBp3k0xSigSuQr3?gv=true"
                  style={{ border: 0 }}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Strategy Call Booking"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-2xl md:text-3xl font-black text-black mb-8">{dict.benefitsHeading}</h3>
            <div className="space-y-6">
              {dict.benefits.map((b) => (
                <div key={b.num} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-black">{b.num}</span>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-black mb-1">{b.title}</h4>
                    <p className="text-gray-700">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-accent/10 rounded-xl border border-accent/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-accent text-2xl">⚡</span>
                <h4 className="text-lg font-bold text-black">{dict.scarcityHeading}</h4>
              </div>
              <p className="text-gray-700 text-sm">{dict.scarcityBody}</p>
            </div>

            <div className="mt-6 text-center lg:text-left">
              <a
                href="mailto:info@tgn-media.com"
                className="text-accent hover:text-accent-dark font-semibold underline underline-offset-4"
              >
                {dict.emailFallback}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
