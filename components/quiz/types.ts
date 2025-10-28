export interface QuizAnswer {
  questionId: string;
  answer: string;
  timestamp: number;
}

export interface QuizData {
  answers: QuizAnswer[];
  variant: 'v1' | 'v2' | 'v3';
  completedAt?: number;
}

export interface ContactData {
  name: string;
  email: string;
  phone: string;
}

export interface Question {
  id: string;
  text: string;
  options: AnswerOption[];
}

export interface AnswerOption {
  id: string;
  text: string;
  imageUrl: string;
  value: string;
}
