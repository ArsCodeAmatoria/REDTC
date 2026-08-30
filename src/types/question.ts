export type Difficulty = "easy" | "medium" | "hard";

/** B.C. / Fulford / SkilledTradesBC exam this question prepares for */
export type ExamId = "b" | "l1" | "l2" | "ip" | "lcr";

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
  /** Exams this question maps to */
  exams?: ExamId[];
  /** Fulford Level B Core Theory section 1–15 */
  bSection?: number;
  /** SkilledTradesBC 2024 OAC competency (e.g. L1-A1, L2-I2) */
  competency?: string;
  /** 2023 Red Seal Occupational Standard task (e.g. A-1, E-12) */
  rsos?: string;
  /** WorkSafeBC OHS section (e.g. 14.92, 15.31, 19.24.1) */
  ohs?: string;
  /** Human-readable source: exam + section + regulation */
  src?: string;
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
