export interface Question {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    explanation: string;
  }[];
  correctAnswer: string;
  category?: string;
}

export interface TestState {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  showExplanation: boolean;
  isComplete: boolean;
}

export interface TestResult {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  answers: Record<number, { selected: string; correct: string; isCorrect: boolean }>;
}
