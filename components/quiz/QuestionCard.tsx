'use client';

import { motion } from 'framer-motion';
import AnswerButton from './AnswerButton';
import ProgressBar from './ProgressBar';
import { Question } from './types';

interface QuestionCardProps {
  question: Question;
  currentStep: number;
  totalSteps: number;
  variant: 'v1' | 'v2' | 'v3';
  onAnswer: (answer: string) => void;
}

export default function QuestionCard({ 
  question, 
  currentStep, 
  totalSteps, 
  variant, 
  onAnswer 
}: QuestionCardProps) {
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

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getVariantGradient()}`}>
      <div className="container mx-auto px-4 py-8">
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          variant={variant} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {question.text}
            </h1>
            <p className="text-lg text-gray-600">
              Wähle die Antwort, die am besten zu dir passt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {question.options.map((option) => (
              <AnswerButton
                key={option.id}
                option={option}
                onClick={() => onAnswer(option.value)}
                variant={variant}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
