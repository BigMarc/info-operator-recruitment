'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q3',
  text: 'Wie viel Zeit pro Woche kannst du investieren, um deinen ersten Creator-Kunden zu landen?',
  options: [
    {
      id: 'h-5-10',
      text: '5 – 10 Stunden',
      imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=600&fit=crop',
      value: 'h-5-10'
    },
    {
      id: 'h-10-20',
      text: '10 – 20 Stunden',
      imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop',
      value: 'h-10-20'
    },
    {
      id: 'h-20-plus',
      text: '20 Stunden oder mehr',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop',
      value: 'h-20-plus'
    },
    {
      id: 'h-under-5',
      text: 'Weniger als 5 Stunden',
      imageUrl: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&h=600&fit=crop',
      value: 'h-under-5'
    }
  ]
};

export default function CanonicalQ3() {
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    const existingData = JSON.parse(localStorage.getItem('quiz-canonical-answers') || '{"answers": []}');
    existingData.answers.push({
      questionId: question.id,
      answer,
      timestamp: Date.now()
    });
    localStorage.setItem('quiz-canonical-answers', JSON.stringify(existingData));

    router.push('/quiz/q4');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={3}
      totalSteps={4}
      variant="canonical"
      onAnswer={handleAnswer}
    />
  );
}
