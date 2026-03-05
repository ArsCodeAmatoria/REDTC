"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, Home, Clock, BookOpen, Target, HardHat, Timer, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard, ProgressBar } from "@/components/quiz";
import { useTest } from "@/hooks/use-test";
import questionsData from "@/data/questions.json";
import type { Question } from "@/types/question";

const questions = questionsData as Question[];
const TOTAL_QUESTIONS = questions.length;

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}

export default function TestPage() {
  const [hasStarted, setHasStarted] = useState(false);

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
    totalTestTime,
    timingStats,
  } = useTest(questions);

  // Start screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent flex items-center justify-center">
                  <span className="text-xl font-black text-accent-foreground">R</span>
                </div>
                <span className="font-display text-xl font-bold tracking-tight hidden sm:block">REDTC</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto space-y-10"
          >
            {/* Header */}
            <div className="text-center space-y-4">
              <span className="category-label">Practice Mode</span>
              <h1 className="font-display text-5xl md:text-6xl font-bold">Quick Practice</h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Test your knowledge with 10 randomly selected questions from our question bank.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 border border-border bg-muted/20">
                <div className="text-3xl font-display font-bold text-accent">10</div>
                <div className="text-xs text-muted-foreground mt-1">Questions</div>
              </div>
              <div className="text-center p-4 border border-border bg-muted/20">
                <div className="text-3xl font-display font-bold text-accent">70%</div>
                <div className="text-xs text-muted-foreground mt-1">To Pass</div>
              </div>
              <div className="text-center p-4 border border-border bg-muted/20">
                <div className="text-3xl font-display font-bold text-accent">{TOTAL_QUESTIONS}</div>
                <div className="text-xs text-muted-foreground mt-1">In Bank</div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* What to Expect */}
            <div className="space-y-6">
              <h2 className="font-display text-xl font-bold text-center">What to Expect</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4 space-y-2">
                  <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-bold text-sm">Multiple Choice</h3>
                  <p className="text-xs text-muted-foreground">
                    Each question has 4 options with detailed explanations after answering.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 space-y-2">
                  <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-bold text-sm">Instant Feedback</h3>
                  <p className="text-xs text-muted-foreground">
                    See correct answers immediately with explanations for each question.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 space-y-2">
                  <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <HardHat className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-bold text-sm">Real Exam Topics</h3>
                  <p className="text-xs text-muted-foreground">
                    Questions cover safety, load charts, rigging, operations, and more.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Topics Covered */}
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-center">Topics Covered</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Safety & Legislation",
                  "Load Charts & Calculations",
                  "Rigging & Slinging",
                  "Crane Components",
                  "Communication",
                  "Site Conditions",
                  "Inspection & Maintenance",
                  "Emergency Procedures",
                ].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1.5 text-xs font-medium bg-muted/50 border border-border"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* CTA */}
            <div className="space-y-4">
              <Button
                onClick={() => setHasStarted(true)}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-lg font-bold"
              >
                Start Practice Test
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Questions are randomly selected each time you practice.
              </p>
              <Link href="/" className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const isPassed = results.passed;
    
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent flex items-center justify-center">
                  <span className="text-xl font-black text-accent-foreground">R</span>
                </div>
                <span className="font-display text-xl font-bold tracking-tight hidden sm:block">REDTC</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto space-y-10"
          >
            {/* Result Header */}
            <div className="text-center space-y-4">
              <span className={`category-label ${!isPassed && 'text-muted-foreground'}`}>
                {isPassed ? "Test Passed" : "Test Not Passed"}
              </span>
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className={`w-16 h-16 flex items-center justify-center ${
                    isPassed ? "bg-accent" : "bg-muted"
                  }`}
                >
                  {isPassed ? (
                    <Check className="w-8 h-8 text-accent-foreground" strokeWidth={2.5} />
                  ) : (
                    <X className="w-8 h-8 text-muted-foreground" strokeWidth={2.5} />
                  )}
                </motion.div>
                <h1 className="font-display text-6xl md:text-7xl font-bold">
                  {results.percentage}%
                </h1>
              </div>
              <p className="text-muted-foreground">
                {isPassed 
                  ? "Great work! You've demonstrated solid knowledge of tower crane operations."
                  : `You need ${passPercentage}% to pass. Review the material and try again.`
                }
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 border border-border bg-muted/20">
                <div className="text-4xl font-display font-bold text-accent">{results.correctCount}</div>
                <div className="text-sm text-muted-foreground mt-2">Correct Answers</div>
              </div>
              <div className="text-center p-6 border border-border bg-muted/20">
                <div className="text-4xl font-display font-bold">{results.incorrectCount}</div>
                <div className="text-sm text-muted-foreground mt-2">Incorrect Answers</div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Time Statistics */}
            <div className="space-y-6">
              <h2 className="font-display text-xl font-bold text-center">Time Statistics</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4 space-y-2">
                  <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-2xl font-display font-bold">{formatTime(totalTestTime)}</div>
                  <p className="text-xs text-muted-foreground">Total Time</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 space-y-2">
                  <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Timer className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-2xl font-display font-bold">{formatTime(timingStats.average)}</div>
                  <p className="text-xs text-muted-foreground">Average per Question</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 space-y-2">
                  <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-2xl font-display font-bold">{formatTime(timingStats.fastest)}</div>
                  <p className="text-xs text-muted-foreground">Fastest Answer</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Test Info */}
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-center">Test Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="text-center p-3 border border-border">
                  <div className="text-lg font-bold">{totalQuestions}</div>
                  <div className="text-xs text-muted-foreground">Questions</div>
                </div>
                <div className="text-center p-3 border border-border">
                  <div className="text-lg font-bold">{passPercentage}%</div>
                  <div className="text-xs text-muted-foreground">Pass Rate</div>
                </div>
                <div className="text-center p-3 border border-border">
                  <div className="text-lg font-bold">{totalQuestionsInBank}</div>
                  <div className="text-xs text-muted-foreground">In Question Bank</div>
                </div>
                <div className="text-center p-3 border border-border">
                  <div className="text-lg font-bold">{formatTime(timingStats.slowest)}</div>
                  <div className="text-xs text-muted-foreground">Slowest Answer</div>
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Next Steps */}
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-center">
                {isPassed ? "Keep Practicing" : "Next Steps"}
              </h2>
              <p className="text-center text-sm text-muted-foreground max-w-md mx-auto">
                {isPassed 
                  ? "Continue practicing to reinforce your knowledge. Try the Master Exam for a more comprehensive challenge."
                  : "Review the questions you missed and focus on those topic areas. Consistent practice is key to passing the Red Seal exam."
                }
              </p>
            </div>

            <div className="h-px bg-border" />

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                onClick={() => resetTest()} 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-lg font-bold"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                {isPassed ? "Practice Again" : "Try Again"}
              </Button>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link href="/test/master" className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    Try Master Exam
                  </Button>
                </Link>
                <Link href="/test/review" className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    Review All Questions
                  </Button>
                </Link>
              </div>
              <Link href="/" className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors pt-2">
                ← Back to Home
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
                <span className="text-xl font-black text-accent-foreground">R</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight hidden sm:block">REDTC</span>
            </Link>
            <span className="text-sm text-muted-foreground">
              {passPercentage}% to pass
            </span>
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
