"use client";

import { motion } from "framer-motion";
import type { Question } from "@/types/question";
import { AnswerOption } from "./answer-option";
import { ExplanationPanel } from "./explanation-panel";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  showExplanation: boolean;
  onSelectAnswer: (answerId: string) => void;
  questionNumber: number;
  totalQuestions: number;
  isReviewMode?: boolean;
}

export function QuestionCard({
  question,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
  isReviewMode = false,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Question Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="category-label">Question {questionNumber}</span>
          {question.category && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{question.category}</span>
            </>
          )}
        </div>
        <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug">
          {question.question}
        </h2>
      </div>

      <div className="h-px bg-border" />

      {/* Answer Options */}
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <AnswerOption
            key={option.id}
            option={option}
            index={index}
            isSelected={selectedAnswer === option.id}
            isCorrect={option.id === question.correctAnswer}
            showResult={showExplanation}
            onClick={() => onSelectAnswer(option.id)}
            disabled={showExplanation && !isReviewMode}
          />
        ))}
      </div>

      {/* Explanation Panel */}
      <ExplanationPanel
        question={question}
        selectedAnswer={selectedAnswer}
        isVisible={showExplanation}
      />
    </motion.div>
  );
}
