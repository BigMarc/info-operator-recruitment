'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function QuizIndex() {
  const variants = [
    {
      id: 'v1',
      title: 'Karriere-Wechsel Fokus',
      description: 'Perfekt für alle, die nach einer neuen beruflichen Herausforderung suchen',
      questions: '3 Fragen',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'from-blue-50 to-purple-50',
      link: '/v1'
    },
    {
      id: 'v2',
      title: 'Einkommens-Potential Fokus',
      description: 'Ideal für alle, die ein zweites Standbein aufbauen möchten',
      questions: '5 Fragen',
      color: 'from-green-500 to-teal-600',
      bgColor: 'from-green-50 to-teal-50',
      link: '/v2'
    },
    {
      id: 'v3',
      title: 'Partnerschafts-Bereitschaft Fokus',
      description: 'Geeignet für alle, die mit Content Creators zusammenarbeiten möchten',
      questions: '4 Fragen',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
      link: '/v3'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Info Operator Quiz
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wähle das Quiz, das am besten zu deiner Situation passt. 
            Jedes Quiz ist darauf ausgelegt, dir die perfekte Beratung zu bieten.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {variants.map((variant, index) => (
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              <div className={`h-2 bg-gradient-to-r ${variant.color}`} />
              
              <div className="p-8">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${variant.color} mb-4`}>
                  {variant.questions}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {variant.title}
                </h2>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {variant.description}
                </p>
                
                <Link href={variant.link}>
                  <motion.button
                    className={`w-full py-4 px-6 rounded-xl text-white font-bold bg-gradient-to-r ${variant.color} hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Quiz starten
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500">
            Alle Quiz sind kostenlos und führen zu einem kostenlosen Beratungsgespräch
          </p>
        </motion.div>
      </div>
    </div>
  );
}
