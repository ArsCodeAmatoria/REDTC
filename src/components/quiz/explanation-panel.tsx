"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Check, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
  const isCorrect = selectedAnswer === question.correctAnswer;

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
          <div className="border border-border">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                <span className="font-display font-semibold">Explanation</span>
              </div>
            </div>

            {/* Correct Answer */}
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-foreground text-background">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider">Correct Answer</span>
                </div>
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">{correctOption?.text}</span>
                  {correctOption?.explanation && (
                    <span className="text-muted-foreground"> — {correctOption.explanation}</span>
                  )}
                </p>
              </div>

              <Separator />

              {/* Why Other Options Are Wrong */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center border border-muted-foreground/50">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Why Other Options Are Incorrect
                  </span>
                </div>
                <div className="space-y-3">
                  {question.options
                    .filter((opt) => opt.id !== question.correctAnswer)
                    .map((opt) => (
                      <div
                        key={opt.id}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="font-medium text-foreground">{opt.text}</span>
                        {opt.explanation && (
                          <span> — {opt.explanation}</span>
                        )}
                      </div>
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
