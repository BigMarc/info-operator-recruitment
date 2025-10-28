'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q4',
  text: 'Hast du bereits Erfahrung mit Infoprodukten?',
  options: [
    {
      id: 'yes',
      text: 'Ja, ich habe schon Erfahrung',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&crop=faces',
      value: 'yes'
    },
    {
      id: 'no',
      text: 'Nein, ich bin komplett neu',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces',
      value: 'no'
    }
  ]
};

export default function V3Question4() {
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

    // Navigate to contact form
    router.push('/v3/contact');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={4}
      totalSteps={5}
      variant="v3"
      onAnswer={handleAnswer}
    />
  );
}
