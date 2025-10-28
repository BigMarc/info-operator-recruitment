'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Founder photo */}
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=800&fit=crop" 
                  alt="Marc Schultheiss - Info Operator Expert" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-black px-6 py-3 rounded-full shadow-lg font-bold">
                Info Operator Expert
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Hi, I'm Marc Schultheiss
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              I've spent the last 8 years training Info Operators to help content creators break free from the 
              sponsor-dependent revenue model and build sustainable, high-margin info product businesses.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Through our proven Info Operator training program, I've trained 50+ operators who now help creators launch paid communities, 
              digital courses, and high-ticket services that consistently generate $10K-$50K+ per launch.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl font-bold">✓</span>
                <p className="text-gray-700">Trained 50+ successful Info Operators earning $5K-$20K+ per client</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl font-bold">✓</span>
                <p className="text-gray-700">90% operator success rate - graduates get matched with clients</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl font-bold">✓</span>
                <p className="text-gray-700">Expert trainer in offer creation, marketing funnels, and automation</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl font-bold">✓</span>
                <p className="text-gray-700">Direct client matching program with vetted influencers</p>
              </div>
            </div>
            <a
              href="#book-call"
              className="inline-block bg-accent text-black px-8 py-4 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
            >
              Book a Call With Me →
            </a>
          </motion.div>
        </div>

        {/* Credibility Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
            <div className="text-3xl font-black text-black mb-2">8+</div>
            <div className="text-gray-700 font-semibold">Years Experience</div>
            <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider">Info Product Expert</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
              <div className="text-3xl font-black text-accent mb-2">50+</div>
              <div className="text-gray-700 font-semibold">Trained Operators</div>
              <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider">Active Graduates</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
            <div className="text-3xl font-black text-black mb-2">$1.2M+</div>
            <div className="text-gray-700 font-semibold">Earned by Operators</div>
            <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider">Revenue Share</div>
          </div>
        </motion.div>

        {/* Info Operator Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-black text-black text-center mb-12">
            How to Become a Successful Info Operator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-lg">1</span>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Learn the System</h4>
              <p className="text-gray-600 text-sm">Complete our comprehensive training program covering offer creation, funnels, and automation</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-lg">2</span>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Master the Tools</h4>
              <p className="text-gray-600 text-sm">Get hands-on experience with automation platforms, sales pages, and marketing systems</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-lg">3</span>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Get Matched with Influencers</h4>
              <p className="text-gray-600 text-sm">We connect you with vetted influencers who need Info Operator services</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-accent/10 shadow-lg">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-lg">4</span>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Earn Revenue Share</h4>
              <p className="text-gray-600 text-sm">20-50% profit split based on your performance and client results</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
