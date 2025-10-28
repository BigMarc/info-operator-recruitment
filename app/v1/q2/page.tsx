'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q2',
  text: 'Wie viel Erfahrung hast du im Online-Marketing?',
  options: [
    {
      id: 'none',
      text: 'Keine Erfahrung',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=faces',
      value: 'none'
    },
    {
      id: 'beginner',
      text: 'Anfänger',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: 'beginner'
    },
    {
      id: 'intermediate',
      text: 'Fortgeschritten',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&crop=faces',
      value: 'intermediate'
    },
    {
      id: 'expert',
      text: 'Experte',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop&crop=faces',
      value: 'expert'
    }
  ]
};

export default function V1Question2() {
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    // Store answer in localStorage
    const existingData = JSON.parse(localStorage.getItem('quiz-v1-answers') || '{"answers": []}');
    existingData.answers.push({
      questionId: question.id,
      answer,
      timestamp: Date.now()
    });
    localStorage.setItem('quiz-v1-answers', JSON.stringify(existingData));

    // Navigate to next question
    router.push('/v1/q3');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={2}
      totalSteps={4}
      variant="v1"
      onAnswer={handleAnswer}
    />
  );
}
