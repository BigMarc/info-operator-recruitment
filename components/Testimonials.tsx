'use client';

import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      background: 'Marketing Manager',
      clients: '8',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: 'I was skeptical about leaving my corporate job, but Marc\'s training program gave me everything I needed. I now have 8 influencer clients and earn $45K annually. The client matching system is incredible.',
      result: '$45K Annual Earnings',
      before: 'Corporate marketing',
      after: 'Info Operator business'
    },
    {
      name: 'Marcus Rodriguez',
      background: 'Freelancer',
      clients: '12',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: 'Working with Marc transformed my freelance business. I went from inconsistent $3K months to earning $68K annually as an Info Operator. The training and client matching made all the difference.',
      result: '$68K Annual Earnings',
      before: '$3K/month freelance',
      after: '$68K annual operator'
    },
    {
      name: 'Emma Thompson',
      background: 'Sales Rep',
      clients: '6',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      quote: 'The lifestyle influencer course launch exceeded all expectations. $28K in the first week! Marc\'s team handled everything from sales pages to email sequences. I couldn\'t have done this alone.',
      result: '$32K Annual Earnings',
      before: 'Sales commission',
      after: 'Predictable operator income'
    },
    {
      name: 'David Kim',
      background: 'Consultant',
      clients: '15',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'As a consultant, I never thought I\'d be helping gaming creators launch products. Marc proved me wrong with my first $55K client launch. The marketing automation training is incredible.',
      result: '$89K Annual Earnings',
      before: 'Hourly consulting',
      after: 'High-ticket operator services'
    },
    {
      name: 'Lisa Johnson',
      background: 'Teacher',
      clients: '4',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      quote: 'Even transitioning from teaching, Marc helped me generate $22K from my first 4 clients. The quality of the training and client matching program made all the difference.',
      result: '$22K Annual Earnings',
      before: 'Teacher salary',
      after: 'Scalable operator business'
    },
    {
      name: 'Alex Rivera',
      background: 'Engineer',
      clients: '10',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      quote: 'The AI course launch was a game-changer. $31K in the first month with minimal effort on my part. Marc\'s system handles everything - I just need to show up and deliver value.',
      result: '$58K Annual Earnings',
      before: 'Engineering salary',
      after: 'Passive operator income'
    },
    {
      name: 'Jessica Park',
      background: 'Health Coach',
      clients: '7',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      quote: 'My nutrition course launch generated $24K in the first two weeks. The email sequences and sales pages are so professional - my clients trusted the offers immediately.',
      result: '$38K Annual Earnings',
      before: 'Coaching sessions',
      after: 'Own operator practice'
    },
    {
      name: 'Ryan Mitchell',
      background: 'Photographer',
      clients: '9',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      quote: 'The photography course launch was incredible - $38K in the first month. Marc\'s team created such compelling sales copy and marketing materials. Highly recommend!',
      result: '$52K Annual Earnings',
      before: 'Photo shoots',
      after: 'Digital product operator'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dark to-accent">
              Trained Operators
            </span>
            {' '}Say
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Real results from real people who've transformed their careers 
            through our Info Operator training and client matching program.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-accent/10 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Avatar and Info */}
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                  <div>
                    <h4 className="text-lg font-bold text-black">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.background}</p>
                    <p className="text-accent font-semibold text-sm">{testimonial.clients} clients</p>
                  </div>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Results */}
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Result:</span>
                  <span className="text-accent font-bold text-lg">{testimonial.result}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Before: {testimonial.before}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-gray-700 font-semibold">{testimonial.after}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
              Join These Successful Operators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-black text-accent mb-2">$404K</div>
                <div className="text-gray-700 font-semibold">Total Earnings</div>
                <div className="text-gray-600 text-sm">From 8 operators above</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-black mb-2">$50K</div>
                <div className="text-gray-700 font-semibold">Average Earnings</div>
                <div className="text-gray-600 text-sm">Per operator</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-accent mb-2">100%</div>
                <div className="text-gray-700 font-semibold">Success Rate</div>
                <div className="text-gray-600 text-sm">Get matched with clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-black mb-2">35%</div>
                <div className="text-gray-700 font-semibold">Average Split</div>
                <div className="text-gray-600 text-sm">Operator profit share</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
