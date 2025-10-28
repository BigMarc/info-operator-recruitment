'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q3',
  text: 'Wie viel Zeit kannst du pro Woche investieren?',
  options: [
    {
      id: '5-10h',
      text: '5 - 10 Stunden',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: '5-10h'
    },
    {
      id: '10-20h',
      text: '10 - 20 Stunden',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&crop=faces',
      value: '10-20h'
    },
    {
      id: '20-plus',
      text: '20+ Stunden',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop&crop=faces',
      value: '20-plus'
    }
  ]
};

export default function V3Question3() {
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    // Store answer in localStorage
    const existingData = JSON.parse(localStorage.getItem('quiz-v3-answers') || '{"answers": []}');
    existingData.answers.push({
      questionId: question.id,
      answer,
      timestamp: Date.now()
    });
    localStorage.setItem('quiz-v3-answers', JSON.stringify(existingData));

    // Navigate to next question
    router.push('/v3/q4');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={3}
      totalSteps={5}
      variant="v3"
      onAnswer={handleAnswer}
    />
  );
}
