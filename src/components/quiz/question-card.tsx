"use client";

import { motion } from "framer-motion";
import type { Question } from "@/types/question";
import { AnswerOption } from "./answer-option";
import { ExplanationPanel } from "./explanation-panel";
import { ChartDisplay } from "./chart-display";
import { FileSpreadsheet, ExternalLink } from "lucide-react";

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
  const chartPdf = question.chartPdf;
  const chartName = question.chartName;

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
        <div className="flex flex-wrap items-center gap-3">
          <span className="category-label">Question {questionNumber}</span>
          {question.category && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{question.category}</span>
            </>
          )}
        </div>
        {chartPdf && (
          <a
            href={`/load-charts/${chartPdf}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2 px-3 border border-accent/40 bg-accent/5 text-sm font-medium text-accent hover:bg-accent/10 hover:border-accent transition-colors w-fit"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Open {chartName || "Load Chart"} (PDF)
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
        <ChartDisplay questionText={question.question} />
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
