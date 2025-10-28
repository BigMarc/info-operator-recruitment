'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q1',
  text: 'Suchst du nach einer neuen beruflichen Herausforderung?',
  options: [
    {
      id: 'yes',
      text: 'Ja, ich bin bereit für etwas Neues',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: 'yes'
    },
    {
      id: 'maybe',
      text: 'Ich überlege es mir',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&crop=faces',
      value: 'maybe'
    }
  ]
};

export default function V1Question1() {
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
    router.push('/v1/q2');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={1}
      totalSteps={4}
      variant="v1"
      onAnswer={handleAnswer}
    />
  );
}
