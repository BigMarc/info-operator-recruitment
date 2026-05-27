'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q4',
  text: 'Wenn wir ein klares Match sind: bist du bereit, in deine Ausbildung zu investieren, um in 90 Tagen 5.000 €+ mit deinem ersten Creator-Kunden zu machen?',
  options: [
    {
      id: 'yes-if-plan',
      text: 'Ja, wenn der Plan steht',
      imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&h=600&fit=crop',
      value: 'yes-if-plan'
    },
    {
      id: 'yes-financing',
      text: 'Ja, wenn es eine Finanzierungsoption gibt',
      imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=600&fit=crop',
      value: 'yes-financing'
    },
    {
      id: 'just-explore',
      text: 'Erstmal will ich nur reinschnuppern',
      imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop',
      value: 'just-explore'
    }
  ]
};

export default function CanonicalQ4() {
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    const existingData = JSON.parse(localStorage.getItem('quiz-canonical-answers') || '{"answers": []}');
    existingData.answers.push({
      questionId: question.id,
      answer,
      timestamp: Date.now()
    });
    localStorage.setItem('quiz-canonical-answers', JSON.stringify(existingData));

    router.push('/quiz/contact');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={4}
      totalSteps={4}
      variant="canonical"
      onAnswer={handleAnswer}
    />
  );
}
