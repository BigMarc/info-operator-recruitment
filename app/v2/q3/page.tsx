'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q3',
  text: 'Wie alt bist du?',
  options: [
    {
      id: '18-25',
      text: '18 - 25 Jahre',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: '18-25'
    },
    {
      id: '26-35',
      text: '26 - 35 Jahre',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&crop=faces',
      value: '26-35'
    },
    {
      id: '36-45',
      text: '36 - 45 Jahre',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop&crop=faces',
      value: '36-45'
    },
    {
      id: '46-plus',
      text: '46+ Jahre',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&crop=faces',
      value: '46-plus'
    }
  ]
};

export default function V2Question3() {
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
    router.push('/v2/q4');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={3}
      totalSteps={6}
      variant="v2"
      onAnswer={handleAnswer}
    />
  );
}
