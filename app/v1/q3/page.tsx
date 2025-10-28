'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q3',
  text: 'Bist du bereit, mit Influencern zusammenzuarbeiten?',
  options: [
    {
      id: 'yes',
      text: 'Ja, das klingt spannend',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop&crop=faces',
      value: 'yes'
    },
    {
      id: 'no',
      text: 'Ich bin mir nicht sicher',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: 'no'
    }
  ]
};

export default function V1Question3() {
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

    // Navigate to contact form
    router.push('/v1/contact');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={3}
      totalSteps={4}
      variant="v1"
      onAnswer={handleAnswer}
    />
  );
}
