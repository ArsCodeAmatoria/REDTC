"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard, ProgressBar } from "@/components/quiz";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { useTest } from "@/hooks/use-test";
import questionsData from "@/data/questions.json";
import type { Question } from "@/types/question";

const questions = questionsData as Question[];

export default function TestPage() {
  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    showExplanation,
    isComplete,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    resetTest,
    results,
    answeredCount,
    totalQuestions,
    totalQuestionsInBank,
    canGoNext,
    canGoPrevious,
    isLastQuestion,
    passPercentage,
  } = useTest(questions);

  if (isComplete) {
    const isPassed = results.passed;
    
    return (
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3">
                <span className="font-display text-2xl font-bold tracking-tight">REDTC</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Result Badge */}
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`w-24 h-24 mx-auto border-2 flex items-center justify-center ${
                  isPassed ? "border-foreground" : "border-muted-foreground"
                }`}
              >
                {isPassed ? (
                  <Check className="w-12 h-12" strokeWidth={2.5} />
                ) : (
                  <X className="w-12 h-12 text-muted-foreground" strokeWidth={2.5} />
                )}
              </motion.div>

              <div>
                <p className="editorial-label mb-2">Test Complete</p>
                <h1 className="font-display text-6xl md:text-7xl font-bold">
                  {results.percentage}%
                </h1>
              </div>

              <div className={`inline-block px-4 py-2 border ${
                isPassed ? "border-foreground" : "border-muted-foreground"
              }`}>
                <span className={`text-sm font-bold uppercase tracking-widest ${
                  isPassed ? "" : "text-muted-foreground"
                }`}>
                  {isPassed ? "Passed" : "Not Passed"}
                </span>
              </div>
            </div>

            <Separator />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 py-4">
              <div className="text-center">
                <div className="text-4xl font-display font-bold">{results.correctCount}</div>
                <div className="text-sm text-muted-foreground mt-1">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold">{results.incorrectCount}</div>
                <div className="text-sm text-muted-foreground mt-1">Incorrect</div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Required: {passPercentage}% ({Math.ceil(totalQuestions * passPercentage / 100)} of {totalQuestions})
              <span className="mx-2">·</span>
              Question Bank: {totalQuestionsInBank} total
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button onClick={resetTest} className="w-full group" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                {isPassed ? "Practice Again" : "Try Again"}
              </Button>
              <Link href="/test/review" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Review All Questions
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="ghost" className="w-full" size="lg">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="font-display text-2xl font-bold">Loading questions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold tracking-tight">REDTC</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {passPercentage}% to pass
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <ProgressBar current={answeredCount} total={totalQuestions} />
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showExplanation={showExplanation}
            onSelectAnswer={selectAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={!canGoPrevious}
            className="group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Previous
          </Button>

          <span className="text-sm font-medium text-muted-foreground">
            {currentQuestionIndex + 1} of {totalQuestions}
          </span>

          <Button
            onClick={nextQuestion}
            disabled={!canGoNext}
            className="group"
          >
            {isLastQuestion ? "Finish" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
