'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q2',
  text: 'Wie viel willst du pro Monat nebenbei verdienen?',
  options: [
    {
      id: '500-1000',
      text: '500 - 1.000€',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop&crop=faces',
      value: '500-1000'
    },
    {
      id: '1000-3000',
      text: '1.000 - 3.000€',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=faces',
      value: '1000-3000'
    },
    {
      id: '3000-5000',
      text: '3.000 - 5.000€',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: '3000-5000'
    },
    {
      id: '5000-plus',
      text: '5.000€+',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&crop=faces',
      value: '5000-plus'
    }
  ]
};

export default function V2Question2() {
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    // Store answer in localStorage
    const existingData = JSON.parse(localStorage.getItem('quiz-v2-answers') || '{"answers": []}');
    existingData.answers.push({
      questionId: question.id,
      answer,
      timestamp: Date.now()
    });
    localStorage.setItem('quiz-v2-answers', JSON.stringify(existingData));

    // Navigate to next question
    router.push('/v2/q3');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={2}
      totalSteps={6}
      variant="v2"
      onAnswer={handleAnswer}
    />
  );
}
