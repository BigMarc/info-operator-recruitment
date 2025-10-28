'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q4',
  text: 'Bist du fähig einer Schritt für Schritt Anleitung zu folgen?',
  options: [
    {
      id: 'yes',
      text: 'Ja, absolut!',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: 'yes'
    },
    {
      id: 'no',
      text: 'Ich bin eher selbstständig',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&crop=faces',
      value: 'no'
    }
  ]
};

export default function V2Question4() {
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
    router.push('/v2/q5');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={4}
      totalSteps={6}
      variant="v2"
      onAnswer={handleAnswer}
    />
  );
}
