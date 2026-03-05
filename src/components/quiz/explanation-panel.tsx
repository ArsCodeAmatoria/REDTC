"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Check, X } from "lucide-react";
import type { Question } from "@/types/question";

interface ExplanationPanelProps {
  question: Question;
  selectedAnswer: string | null;
  isVisible: boolean;
}

export function ExplanationPanel({
  question,
  selectedAnswer,
  isVisible,
}: ExplanationPanelProps) {
  const correctOption = question.options.find(
    (opt) => opt.id === question.correctAnswer
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="border border-border mt-6">
            {/* Header */}
            <div className="px-5 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-semibold">Explanation</span>
            </div>

            <div className="p-5 space-y-5">
              {/* Correct Answer */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-accent flex items-center justify-center">
                    <Check className="w-3 h-3 text-accent-foreground" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Correct Answer</span>
                </div>
                <p className="text-sm leading-relaxed pl-7">
                  <span className="font-medium">{correctOption?.text}</span>
                  {correctOption?.explanation && (
                    <span className="text-muted-foreground"> — {correctOption.explanation}</span>
                  )}
                </p>
              </div>

              <div className="h-px bg-border" />

              {/* Why Other Options Are Wrong */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-muted flex items-center justify-center">
                    <X className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Why others are wrong
                  </span>
                </div>
                <div className="space-y-2 pl-7">
                  {question.options
                    .filter((opt) => opt.id !== question.correctAnswer)
                    .map((opt) => (
                      <p
                        key={opt.id}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="font-medium text-foreground">{opt.text}</span>
                        {opt.explanation && (
                          <span> — {opt.explanation}</span>
                        )}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
