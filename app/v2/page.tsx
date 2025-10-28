'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q1',
  text: 'Hast du Interesse an einem zweiten Standbein?',
  options: [
    {
      id: 'yes',
      text: 'Ja, definitiv!',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=faces',
      value: 'yes'
    },
    {
      id: 'maybe',
      text: 'Ich überlege es mir',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: 'maybe'
    }
  ]
};

export default function V2Question1() {
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
    router.push('/v2/q2');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={1}
      totalSteps={6}
      variant="v2"
      onAnswer={handleAnswer}
    />
  );
}
