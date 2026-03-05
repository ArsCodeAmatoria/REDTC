"use client";

import { motion } from "framer-motion";
import type { Question } from "@/types/question";
import { AnswerOption } from "./answer-option";
import { ExplanationPanel } from "./explanation-panel";
import { Separator } from "@/components/ui/separator";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Question Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="editorial-label">
            Question {questionNumber}
          </span>
          {question.category && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{question.category}</span>
            </>
          )}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold leading-tight">
          {question.question}
        </h2>
      </div>

      <Separator />

      {/* Answer Options */}
      <div className="space-y-3">
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
