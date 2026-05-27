'use client';

import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/QuestionCard';
import { Question } from '@/components/quiz/types';

const question: Question = {
  id: 'q2',
  text: 'Wo stehst du gerade beruflich?',
  options: [
    {
      id: 'employed',
      text: 'Angestellt',
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
      value: 'employed'
    },
    {
      id: 'self-employed',
      text: 'Selbstständig / Freelancer',
      imageUrl: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&h=600&fit=crop',
      value: 'self-employed'
    },
    {
      id: 'student',
      text: 'Student / in Ausbildung',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
      value: 'student'
    },
    {
      id: 'between-jobs',
      text: 'Aktuell zwischen Jobs',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop',
      value: 'between-jobs'
    }
  ]
};

export default function CanonicalQ2() {
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    const existingData = JSON.parse(localStorage.getItem('quiz-canonical-answers') || '{"answers": []}');
    existingData.answers.push({
      questionId: question.id,
      answer,
      timestamp: Date.now()
    });
    localStorage.setItem('quiz-canonical-answers', JSON.stringify(existingData));

    router.push('/quiz/q3');
  };

  return (
    <QuestionCard
      question={question}
      currentStep={2}
      totalSteps={4}
      variant="canonical"
      onAnswer={handleAnswer}
    />
  );
}
