'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q5',
  text: 'Wie sieht deine berufliche Lage aus?',
  options: [
    {
      id: 'employed',
      text: 'Angestellt',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: 'employed'
    },
    {
      id: 'self-employed',
      text: 'Selbstständig',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&crop=faces',
      value: 'self-employed'
    },
    {
      id: 'unemployed',
      text: 'Arbeitssuchend',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&crop=faces',
      value: 'unemployed'
    }
  ]
};

export default function V2Question5() {
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

    // Navigate to contact form
    router.push('/v2/contact');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={5}
      totalSteps={6}
      variant="v2"
      onAnswer={handleAnswer}
    />
  );
}
