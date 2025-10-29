'use client';

import { motion } from 'framer-motion';

export default function SocialProof() {
  const stats = [
    { number: '50+', label: 'Trained Partners', sublabel: 'Active Graduates' },
    { number: '$1.2M+', label: 'Earned by Partners', sublabel: 'Revenue Share' },
    { number: '90%', label: 'Success Rate', sublabel: 'Get Matched with Clients' },
    { number: '$12K', label: 'Average Earnings', sublabel: 'Per Client' },
  ];

  const operators = [
    { name: 'Sarah Chen', background: 'Marketing Manager', clients: '8', earnings: '$45K' },
    { name: 'Marcus Rodriguez', background: 'Freelancer', clients: '12', earnings: '$68K' },
    { name: 'Emma Thompson', background: 'Sales Rep', clients: '6', earnings: '$32K' },
    { name: 'David Kim', background: 'Consultant', clients: '15', earnings: '$89K' },
    { name: 'Lisa Johnson', background: 'Teacher', clients: '4', earnings: '$22K' },
    { name: 'Alex Rivera', background: 'Engineer', clients: '10', earnings: '$58K' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Join{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              50+ Successful Partners
            </span>
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
            From marketing managers to freelancers, we've trained partners across all backgrounds 
            to build successful Growth Partner practices and earn $5K-$20K+ per client.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl md:text-5xl font-black text-accent mb-2">{stat.number}</div>
              <div className="text-black font-bold text-lg mb-1">{stat.label}</div>
              <div className="text-gray-600 text-sm">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Client Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-black text-black text-center mb-12">
            Recent Operator Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operators.map((operator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg">
                      {operator.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black">{operator.name}</h4>
                    <p className="text-gray-600 text-sm">{operator.background}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clients:</span>
                    <span className="font-bold text-black">{operator.clients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Earnings:</span>
                    <span className="font-bold text-accent">{operator.earnings}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border-2 border-accent/20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-black text-black mb-6">
              Why Operators Choose Our Program
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black text-2xl">🎓</span>
                </div>
                <h4 className="text-lg font-bold text-black mb-2">Comprehensive Training</h4>
                <p className="text-gray-700">Complete system covering all aspects of Growth Partner services</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black text-2xl">🤝</span>
                </div>
                <h4 className="text-lg font-bold text-black mb-2">Client Matching</h4>
                <p className="text-gray-700">We connect you with vetted influencers who need your services</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black text-2xl">💰</span>
                </div>
                <h4 className="text-lg font-bold text-black mb-2">High Earnings</h4>
                <p className="text-gray-700">20-50% revenue share with unlimited earning potential</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
