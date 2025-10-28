'use client';

import { motion } from 'framer-motion';
import CalendarEmbed from '../CalendarEmbed';

interface SuccessPageProps {
  variant: 'v1' | 'v2' | 'v3';
}

export default function SuccessPage({ variant }: SuccessPageProps) {
  const getVariantGradient = () => {
    switch (variant) {
      case 'v1':
        return 'from-blue-50 to-purple-50';
      case 'v2':
        return 'from-green-50 to-teal-50';
      case 'v3':
        return 'from-orange-50 to-red-50';
      default:
        return 'from-blue-50 to-purple-50';
    }
  };

  const getVariantMessage = () => {
    switch (variant) {
      case 'v1':
        return {
          title: 'Perfekt! Du bist bereit für den nächsten Schritt',
          subtitle: 'Deine Antworten zeigen, dass du bereit für eine neue berufliche Herausforderung bist. Lass uns gemeinsam dein Info Operator Business aufbauen!'
        };
      case 'v2':
        return {
          title: 'Fantastisch! Du hast das Zeug zum Erfolg',
          subtitle: 'Basierend auf deinen Antworten bist du der perfekte Kandidat für unser Info Operator Programm. Lass uns dein zweites Standbein aufbauen!'
        };
      case 'v3':
        return {
          title: 'Ausgezeichnet! Du bist ein idealer Partner',
          subtitle: 'Deine Antworten zeigen, dass du perfekt für eine Partnerschaft mit Content Creators geeignet bist. Lass uns gemeinsam durchstarten!'
        };
      default:
        return {
          title: 'Perfekt! Du bist bereit für den nächsten Schritt',
          subtitle: 'Lass uns gemeinsam dein Info Operator Business aufbauen!'
        };
    }
  };

  const message = getVariantMessage();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getVariantGradient()}`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Success Message */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {message.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {message.subtitle}
            </p>
          </div>

          {/* Calendar Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Buche jetzt dein kostenloses Beratungsgespräch
              </h2>
              <p className="text-gray-600">
                Wähle einen passenden Termin und lass uns über deine Möglichkeiten sprechen
              </p>
            </div>
            
            <CalendarEmbed />
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Was erwartet dich im Beratungsgespräch?
              </h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Analyse deiner aktuellen Situation</li>
                <li>• Individuelle Strategie für dein Info Operator Business</li>
                <li>• Konkrete nächste Schritte</li>
                <li>• Beantwortung aller deiner Fragen</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
