"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard, ProgressBar } from "@/components/quiz";
import { ThemeToggle } from "@/components/theme-toggle";
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
            <div className="flex items-center justify-between h-14">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent flex items-center justify-center">
                  <span className="font-display text-sm font-black text-accent-foreground">R</span>
                </div>
                <span className="font-display text-xl font-bold tracking-tight hidden sm:block">REDTC</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="max-w-xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Result */}
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`w-20 h-20 mx-auto flex items-center justify-center ${
                  isPassed ? "bg-accent" : "bg-muted"
                }`}
              >
                {isPassed ? (
                  <Check className="w-10 h-10 text-accent-foreground" strokeWidth={2.5} />
                ) : (
                  <X className="w-10 h-10 text-muted-foreground" strokeWidth={2.5} />
                )}
              </motion.div>

              <div>
                <span className={`category-label ${!isPassed && 'text-muted-foreground'}`}>
                  {isPassed ? "Passed" : "Not Passed"}
                </span>
                <h1 className="font-display text-6xl md:text-7xl font-bold mt-2">
                  {results.percentage}%
                </h1>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 py-4">
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{results.correctCount}</div>
                <div className="text-sm text-muted-foreground mt-1">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{results.incorrectCount}</div>
                <div className="text-sm text-muted-foreground mt-1">Incorrect</div>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Required: {passPercentage}% · From {totalQuestionsInBank} total questions
            </p>

            <div className="h-px bg-border" />

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Button 
                onClick={resetTest} 
                className={`w-full ${isPassed ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`}
                size="lg"
              >
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
          <div className="w-8 h-8 bg-accent mx-auto animate-pulse" />
          <div className="font-medium">Loading questions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent flex items-center justify-center">
                <span className="font-display text-sm font-black text-accent-foreground">R</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight hidden sm:block">REDTC</span>
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
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ProgressBar current={answeredCount} total={totalQuestions} />
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
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
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>

          <Button
            onClick={nextQuestion}
            disabled={!canGoNext}
            className={canGoNext && isLastQuestion ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}
          >
            {isLastQuestion ? "Finish" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
