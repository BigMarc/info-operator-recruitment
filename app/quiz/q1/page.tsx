'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q1',
  text: 'Was willst du in den nächsten 90 Tagen erreichen?',
  options: [
    {
      id: 'side-5k',
      text: '5.000 €/Monat als zweites Standbein',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
      value: 'side-5k'
    },
    {
      id: 'main-10k',
      text: '10.000 €/Monat als Hauptjob',
      imageUrl: 'https://images.unsplash.com/photo-1579621970590-9d624316904b?w=800&h=600&fit=crop',
      value: 'main-10k'
    },
    {
      id: 'replace-job',
      text: 'Job ersetzen + ortsunabhängig arbeiten',
      imageUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop',
      value: 'replace-job'
    },
    {
      id: 'just-info',
      text: 'Erstmal nur informieren',
      imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=600&fit=crop',
      value: 'just-info'
    }
  ]
};

export default function CanonicalQ1() {
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    const existingData = JSON.parse(localStorage.getItem('quiz-canonical-answers') || '{"answers": []}');
    existingData.answers.push({
      questionId: question.id,
      answer,
      timestamp: Date.now()
    });
    localStorage.setItem('quiz-canonical-answers', JSON.stringify(existingData));

    router.push('/quiz/q2');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={1}
      totalSteps={4}
      variant="canonical"
      onAnswer={handleAnswer}
    />
  );
}
