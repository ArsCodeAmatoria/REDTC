"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, Home, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard, ProgressBar } from "@/components/quiz";
import { Header } from "@/components/layout/header";
import { useTest } from "@/hooks/use-test";
import questionsData from "@/data/questions.json";
import type { Question } from "@/types/question";

const questions = questionsData as Question[];

const MASTER_QUESTIONS = 120;
const MASTER_PASS_PERCENTAGE = 70;
const TIMER_DURATION = 4 * 60 * 60; // 4 hours in seconds

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function MasterTestPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION);
  const [timerExpired, setTimerExpired] = useState(false);

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
  } = useTest(questions, {
    questionsPerTest: MASTER_QUESTIONS,
    passPercentage: MASTER_PASS_PERCENTAGE,
  });

  // Timer effect
  useEffect(() => {
    if (!hasStarted || isComplete || timerExpired) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted, isComplete, timerExpired]);

  const handleStart = useCallback(() => {
    setHasStarted(true);
    setTimeRemaining(TIMER_DURATION);
    setTimerExpired(false);
  }, []);

  const handleReset = useCallback(() => {
    resetTest();
    setHasStarted(false);
    setTimeRemaining(TIMER_DURATION);
    setTimerExpired(false);
  }, [resetTest]);

  const isLowTime = timeRemaining < 15 * 60; // Less than 15 minutes

  // Start screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen pt-14">
        <Header />

        <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="max-w-lg w-full text-center space-y-8"
          >
            <div>
              <span className="category-label">Master Exam</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">Red Seal Simulation</h1>
            </div>

            <p className="text-muted-foreground">
              This exam simulates real Red Seal examination conditions with 120 questions and a 4-hour time limit.
            </p>

            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="border border-border p-4">
                <div className="text-3xl font-display font-bold">{MASTER_QUESTIONS}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="border border-border p-4">
                <div className="text-3xl font-display font-bold">4:00</div>
                <div className="text-sm text-muted-foreground">Hours</div>
              </div>
              <div className="border border-border p-4">
                <div className="text-3xl font-display font-bold">{MASTER_PASS_PERCENTAGE}%</div>
                <div className="text-sm text-muted-foreground">To Pass</div>
              </div>
            </div>

            <div className="bg-muted/50 border border-border p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <AlertTriangle className="w-4 h-4 text-accent" />
                Before you begin
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                <li>• The timer will start immediately</li>
                <li>• You cannot pause the exam</li>
                <li>• Unanswered questions count as incorrect</li>
                <li>• Review your answers before time expires</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button 
                size="lg" 
                onClick={handleStart}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Clock className="mr-2 h-4 w-4" />
                Start Master Exam
              </Button>
              <Link href="/test" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Back to Practice Test
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Results screen (either completed or time expired)
  if (isComplete || timerExpired) {
    const isPassed = results.passed && !timerExpired;
    
    return (
      <div className="min-h-screen pt-14">
        <Header />

        <div className="max-w-xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <div className="text-center space-y-6">
              <div
                className={`w-20 h-20 mx-auto flex items-center justify-center ${
                  isPassed ? "bg-accent" : "bg-muted"
                }`}
              >
                {isPassed ? (
                  <Check className="w-10 h-10 text-accent-foreground" strokeWidth={2.5} />
                ) : (
                  <X className="w-10 h-10 text-muted-foreground" strokeWidth={2.5} />
                )}
              </div>

              <div>
                <span className={`category-label ${!isPassed && 'text-muted-foreground'}`}>
                  {timerExpired ? "Time Expired" : isPassed ? "Passed" : "Not Passed"}
                </span>
                <h1 className="font-display text-6xl md:text-7xl font-bold mt-2">
                  {results.percentage}%
                </h1>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="grid grid-cols-3 gap-6 py-4">
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{results.correctCount}</div>
                <div className="text-sm text-muted-foreground mt-1">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{results.incorrectCount}</div>
                <div className="text-sm text-muted-foreground mt-1">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{answeredCount}</div>
                <div className="text-sm text-muted-foreground mt-1">Answered</div>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Master Exam · {MASTER_QUESTIONS} questions · {passPercentage}% required
            </p>

            <div className="h-px bg-border" />

            <div className="space-y-3 pt-2">
              <Button 
                onClick={handleReset} 
                className={`w-full ${isPassed ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`}
                size="lg"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {isPassed ? "Take Again" : "Try Again"}
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
    <div className="min-h-screen pt-14">
      <Header rightContent={
        <div className={`flex items-center gap-2 px-3 py-1.5 border ${isLowTime ? 'border-red-500 bg-red-500/10' : 'border-border'}`}>
          <Clock className={`w-4 h-4 ${isLowTime ? 'text-red-500' : 'text-muted-foreground'}`} />
          <span className={`font-mono text-sm font-medium ${isLowTime ? 'text-red-500' : ''}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      } />

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
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-border gap-2">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={!canGoPrevious}
            className="min-h-[44px] px-3 sm:px-4"
          >
            <ArrowLeft className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>

          <Button
            onClick={nextQuestion}
            disabled={!canGoNext}
            className={`min-h-[44px] px-3 sm:px-4 ${canGoNext && isLastQuestion ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}`}
          >
            <span className="hidden sm:inline">{isLastQuestion ? "Finish" : "Next"}</span>
            <span className="sm:hidden">{isLastQuestion ? "Done" : "Next"}</span>
            <ArrowRight className="h-4 w-4 sm:ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
