'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q1',
  text: 'Möchtest du mit Content Creators zusammenarbeiten?',
  options: [
    {
      id: 'yes',
      text: 'Ja, das ist genau mein Ding!',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop&crop=faces',
      value: 'yes'
    },
    {
      id: 'maybe',
      text: 'Ich bin mir nicht sicher',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: 'maybe'
    }
  ]
};

export default function V3Question1() {
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
    router.push('/v3/q2');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={1}
      totalSteps={5}
      variant="v3"
      onAnswer={handleAnswer}
    />
  );
}
