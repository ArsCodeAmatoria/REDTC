export type Difficulty = "easy" | "medium" | "hard";

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
  difficulty?: Difficulty;
  /** PDF filename for load chart questions - enables "Open Chart" link */
  chartPdf?: string;
  /** Chart name for display (e.g. "Liebherr 470 EC-B") */
  chartName?: string;
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
