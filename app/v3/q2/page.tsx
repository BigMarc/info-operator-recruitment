'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q2',
  text: 'Welches Geschäftsmodell interessiert dich?',
  options: [
    {
      id: 'courses',
      text: 'Online-Kurse',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=faces',
      value: 'courses'
    },
    {
      id: 'community',
      text: 'Community/Mitgliedschaften',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=faces',
      value: 'community'
    },
    {
      id: 'coaching',
      text: '1:1 Coaching',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: 'coaching'
    }
  ]
};

export default function V3Question2() {
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
    router.push('/v3/q3');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={2}
      totalSteps={5}
      variant="v3"
      onAnswer={handleAnswer}
    />
  );
}
