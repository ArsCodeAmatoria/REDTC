"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, Home, Clock, Timer, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard, ProgressBar } from "@/components/quiz";
import { Header } from "@/components/layout/header";
import { useTest } from "@/hooks/use-test";
import questionsData from "@/data/questions.json";
import loadChartData from "@/data/load-chart-questions.json";
import type { Question } from "@/types/question";
import { EXAM_TRACKS, selectTrackQuestions, type ExamTrack } from "@/data/exam-tracks";

const theoryQuestions = questionsData as Question[];
const chartQuestions: Question[] = (() => {
  let id = 20000;
  return loadChartData.charts.flatMap((chart) =>
    chart.questions.map((q) => ({
      ...(q as Question),
      id: id++,
      category: `Load Chart: ${chart.name}`,
      chartPdf: chart.pdfFile,
      chartName: chart.name,
    }))
  );
})();
const questions: Question[] = [...theoryQuestions, ...chartQuestions];

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
  const [selectedTrack, setSelectedTrack] = useState<ExamTrack["id"]>("practice");
  const track = EXAM_TRACKS.find((t) => t.id === selectedTrack)!;

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
    initializeTest,
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
  } = useTest(questions, {
    questionsPerTest: track.questions,
    passPercentage: track.passPercent,
  });

  const handleStartTest = () => {
    initializeTest(selectTrackQuestions(questions, selectedTrack));
    setHasStarted(true);
  };

  // Start screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen pt-14">
        <Header />

        <div className="px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl mx-auto space-y-10"
          >
            {/* Header */}
            <div className="text-center space-y-4">
              <span className="category-label">Practice by exam</span>
              <h1 className="font-display text-5xl md:text-6xl font-bold">Choose a paper</h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Papers follow Fulford Level B, SkilledTradesBC Level 1 & 2, Red Seal IP, and the load-chart practical. Every question is tagged to the section and regulation it tests.
              </p>
            </div>

            <div className="grid gap-2">
              {EXAM_TRACKS.map((item) => {
                const selected = item.id === selectedTrack;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedTrack(item.id)}
                    className={`text-left p-4 border transition-colors ${
                      selected
                        ? "border-accent bg-accent/10"
                        : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-bold">{item.title}</span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {item.questions} Q · {item.passPercent}%
                        {item.minutes ? ` · ${item.minutes} min` : ""}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.subtitle}</p>
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{track.body}</p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 border border-border bg-muted/20">
                <div className="text-3xl font-display font-bold text-accent">{track.questions}</div>
                <div className="text-xs text-muted-foreground mt-1">Questions</div>
              </div>
              <div className="text-center p-4 border border-border bg-muted/20">
                <div className="text-3xl font-display font-bold text-accent">{track.passPercent}%</div>
                <div className="text-xs text-muted-foreground mt-1">To Pass</div>
              </div>
              <div className="text-center p-4 border border-border bg-muted/20">
                <div className="text-3xl font-display font-bold text-accent">{questions.length}</div>
                <div className="text-xs text-muted-foreground mt-1">In Bank</div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* CTA */}
            <div className="space-y-4">
              <Button
                onClick={handleStartTest}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-lg font-bold"
              >
                Start {track.title}
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
      <div className="min-h-screen pt-14">
        <Header />

        <div className="px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl mx-auto space-y-10"
          >
            {/* Result Header */}
            <div className="text-center space-y-4">
              <span className={`category-label ${!isPassed && 'text-muted-foreground'}`}>
                {isPassed ? "Test Passed" : "Test Not Passed"}
              </span>
              <div className="flex items-center justify-center gap-4">
                <div
                  className={`w-16 h-16 flex items-center justify-center ${
                    isPassed ? "bg-accent" : "bg-muted"
                  }`}
                >
                  {isPassed ? (
                    <Check className="w-8 h-8 text-accent-foreground" strokeWidth={2.5} />
                  ) : (
                    <X className="w-8 h-8 text-muted-foreground" strokeWidth={2.5} />
                  )}
                </div>
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
    <div className="min-h-screen pt-14">
      <Header rightContent={
        <span className="text-sm text-muted-foreground">
          {passPercentage}% to pass
        </span>
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
