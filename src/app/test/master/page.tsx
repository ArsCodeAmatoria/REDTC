"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, Home, Clock, AlertTriangle, Flag, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard, ProgressBar, FormulaSheet } from "@/components/quiz";
import { Header } from "@/components/layout/header";
import { useTest } from "@/hooks/use-test";
import questionsData from "@/data/questions.json";
import loadChartData from "@/data/load-chart-questions.json";
import type { Question } from "@/types/question";
import {
  selectIpPaper,
  scoreByMwa,
  RSOS_MWA,
  RSOS_TASKS,
  parseRsosTask,
} from "@/data/exam-tracks";

const generalQuestions = questionsData as Question[];

const LOAD_CHART_ID_OFFSET = 10000;
const masterLoadChartQuestions: Question[] = (() => {
  let id = LOAD_CHART_ID_OFFSET;
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

const questions: Question[] = [...generalQuestions, ...masterLoadChartQuestions];

const MASTER_QUESTIONS = 100;
const MASTER_PASS_PERCENTAGE = 70;
const TIMER_DURATION = 4 * 60 * 60;

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
  const [formulasOpen, setFormulasOpen] = useState(false);
  const [flagged, setFlagged] = useState<Set<number>>(() => new Set());
  const [reviewMissed, setReviewMissed] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    isComplete,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitExam,
    initializeTest,
    testQuestions,
    results,
    answeredCount,
    totalQuestions,
    canGoPrevious,
    isLastQuestion,
    passPercentage,
  } = useTest(questions, {
    questionsPerTest: MASTER_QUESTIONS,
    passPercentage: MASTER_PASS_PERCENTAGE,
    examMode: true,
  });

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

  useEffect(() => {
    if (timerExpired && hasStarted && !isComplete) {
      submitExam();
    }
  }, [timerExpired, hasStarted, isComplete, submitExam]);

  const handleStart = useCallback(() => {
    initializeTest(selectIpPaper(questions));
    setHasStarted(true);
    setTimeRemaining(TIMER_DURATION);
    setTimerExpired(false);
    setFlagged(new Set());
    setReviewMissed(false);
    setReviewIndex(0);
    setFormulasOpen(false);
  }, [initializeTest]);

  const handleReset = useCallback(() => {
    setHasStarted(false);
    setTimeRemaining(TIMER_DURATION);
    setTimerExpired(false);
    setFlagged(new Set());
    setReviewMissed(false);
    setReviewIndex(0);
  }, []);

  const toggleFlag = () => {
    if (!currentQuestion) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
      else next.add(currentQuestion.id);
      return next;
    });
  };

  const handleFinish = () => {
    const unanswered = totalQuestions - answeredCount;
    if (unanswered > 0) {
      const ok = window.confirm(
        `${unanswered} unanswered question${unanswered === 1 ? "" : "s"} will count as incorrect. Submit anyway?`
      );
      if (!ok) return;
    }
    submitExam();
  };

  const isLowTime = timeRemaining < 15 * 60;
  const mwaScores = scoreByMwa(testQuestions, results.answers);
  const missed = testQuestions.filter((q) => !results.answers[q.id]?.isCorrect);
  const unanswered = totalQuestions - answeredCount;
  const wrongAnswered = results.incorrectCount - unanswered;

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
            <div className="text-center space-y-3">
              <span className="category-label">Interprovincial exam</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold">Red Seal IP</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Closed-book simulation of the Tower Crane Operator Interprovincial exam
                (2023 RSOS). In B.C. you sit this through SkilledTradesBC after passing
                Level 1 SLE. 100 four-option questions. 70 correct to pass.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="border border-border p-4 text-center">
                <div className="text-3xl font-display font-bold">{MASTER_QUESTIONS}</div>
                <div className="text-xs text-muted-foreground mt-1">Questions</div>
              </div>
              <div className="border border-border p-4 text-center">
                <div className="text-3xl font-display font-bold">4:00</div>
                <div className="text-xs text-muted-foreground mt-1">Hours</div>
              </div>
              <div className="border border-border p-4 text-center">
                <div className="text-3xl font-display font-bold">70</div>
                <div className="text-xs text-muted-foreground mt-1">To pass</div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold mb-3">Official question counts</h2>
              <div className="space-y-2">
                {RSOS_MWA.map((block) => (
                  <div key={block.letter} className="border border-border px-3 py-2">
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span>
                        <span className="font-mono font-bold mr-2">{block.letter}</span>
                        {block.name}
                      </span>
                      <span className="text-muted-foreground shrink-0">{block.count}</span>
                    </div>
                    <ul className="mt-1 text-xs text-muted-foreground space-y-0.5">
                      {RSOS_TASKS.filter((t) => t.mwa === block.letter).map((task) => (
                        <li key={task.id}>
                          {task.id} {task.name} · {task.count}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 border border-border p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <AlertTriangle className="w-4 h-4 text-accent" />
                Same rules as the sitting
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                <li>No code book. Formulas and acronyms are on the sheet (open it any time).</li>
                <li>No answer key until you submit. You can skip, flag, and change answers.</li>
                <li>Load-chart items include an Open Chart PDF (up to four, as lift-planning items).</li>
                <li>Unanswered questions count as incorrect. Time expiry submits the paper.</li>
                <li>70/100 passes — even if the clock hits zero.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                onClick={handleStart}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Clock className="mr-2 h-4 w-4" />
                Start Red Seal IP
              </Button>
              <Link href="/test" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Back to Practice papers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const isPassed = results.passed;
    const reviewQuestion = missed[reviewIndex];

    if (reviewMissed && reviewQuestion) {
      return (
        <div className="min-h-screen pt-14">
          <Header />
          <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
            <p className="text-sm text-muted-foreground mb-6">
              Missed {reviewIndex + 1} of {missed.length}
              {parseRsosTask(reviewQuestion) ? ` · RSOS ${parseRsosTask(reviewQuestion)}` : ""}
            </p>
            <QuestionCard
              question={reviewQuestion}
              selectedAnswer={results.answers[reviewQuestion.id]?.selected || null}
              showExplanation={true}
              onSelectAnswer={() => {}}
              questionNumber={testQuestions.findIndex((q) => q.id === reviewQuestion.id) + 1}
              totalQuestions={totalQuestions}
              isReviewMode={true}
            />
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setReviewIndex((i) => Math.max(0, i - 1))}
                disabled={reviewIndex === 0}
              >
                Previous
              </Button>
              <Button variant="ghost" onClick={() => setReviewMissed(false)}>
                Back to results
              </Button>
              <Button
                onClick={() => {
                  if (reviewIndex < missed.length - 1) setReviewIndex(reviewIndex + 1);
                  else setReviewMissed(false);
                }}
              >
                {reviewIndex < missed.length - 1 ? "Next missed" : "Done"}
              </Button>
            </div>
          </div>
        </div>
      );
    }

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
                <span className={`category-label ${!isPassed && "text-muted-foreground"}`}>
                  {timerExpired && isPassed
                    ? "Time expired · Passed"
                    : timerExpired
                      ? "Time expired · Not passed"
                      : isPassed
                        ? "Passed"
                        : "Not passed"}
                </span>
                <h1 className="font-display text-6xl md:text-7xl font-bold mt-2">
                  {results.percentage}%
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  {results.correctCount} / {MASTER_QUESTIONS} · 70 required
                </p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="grid grid-cols-3 gap-6 py-2">
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{results.correctCount}</div>
                <div className="text-sm text-muted-foreground mt-1">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{Math.max(0, wrongAnswered)}</div>
                <div className="text-sm text-muted-foreground mt-1">Wrong</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold">{unanswered}</div>
                <div className="text-sm text-muted-foreground mt-1">Blank</div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-lg font-bold">By major work activity</h2>
              {mwaScores.map((block) => (
                <div key={block.letter} className="flex items-center justify-between text-sm border border-border px-3 py-2">
                  <span>
                    <span className="font-mono font-bold mr-2">{block.letter}</span>
                    {block.name}
                  </span>
                  <span className="tabular-nums">
                    {block.correct}/{block.count}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-3 pt-2">
              {missed.length > 0 && (
                <Button
                  onClick={() => {
                    setReviewIndex(0);
                    setReviewMissed(true);
                  }}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  size="lg"
                >
                  Review missed ({missed.length})
                </Button>
              )}
              <Button onClick={handleReset} variant="outline" className="w-full" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                {isPassed ? "Sit another paper" : "Try again"}
              </Button>
              <Link href="/test" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Practice papers
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
          <div className="font-medium">Building a 2023 RSOS paper…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14">
      <Header
        rightContent={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFormulasOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 border border-border text-xs font-medium hover:bg-muted"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Formulas
            </button>
            <div
              className={`flex items-center gap-2 px-3 py-1.5 border ${
                isLowTime ? "border-red-500 bg-red-500/10" : "border-border"
              }`}
            >
              <Clock className={`w-4 h-4 ${isLowTime ? "text-red-500" : "text-muted-foreground"}`} />
              <span className={`font-mono text-sm font-medium ${isLowTime ? "text-red-500" : ""}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        }
      />

      <FormulaSheet open={formulasOpen} onClose={() => setFormulasOpen(false)} />

      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4 space-y-3">
          <ProgressBar current={answeredCount} total={totalQuestions} />
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowNav((v) => !v)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {showNav ? "Hide" : "Show"} question list
            </button>
            <button
              type="button"
              onClick={() => setFormulasOpen(true)}
              className="sm:hidden text-xs font-medium flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Formulas
            </button>
          </div>
          {showNav && (
            <div className="space-y-2">
              <div className="grid grid-cols-10 gap-1">
              {testQuestions.map((q, i) => {
                const answered = Boolean(results.answers[q.id]?.selected);
                const isCurrent = i === currentQuestionIndex;
                const isFlagged = flagged.has(q.id);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => goToQuestion(i)}
                    className={`h-8 text-[10px] font-medium border ${
                      isCurrent
                        ? "border-accent bg-accent text-accent-foreground"
                        : answered
                          ? "border-border bg-muted"
                          : "border-border"
                    } ${isFlagged && !isCurrent ? "text-accent" : ""}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
              </div>
              <button
                type="button"
                onClick={handleFinish}
                className="text-xs font-medium text-accent hover:underline"
              >
                Submit exam
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showExplanation={false}
            onSelectAnswer={selectAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            hideMeta
          />
        </AnimatePresence>

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

          <button
            type="button"
            onClick={toggleFlag}
            className={`flex items-center gap-1.5 text-xs font-medium px-2 py-2 ${
              flagged.has(currentQuestion.id) ? "text-accent" : "text-muted-foreground"
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            {flagged.has(currentQuestion.id) ? "Flagged" : "Flag"}
          </button>

          {isLastQuestion ? (
            <Button onClick={handleFinish} className="min-h-[44px] px-3 sm:px-4 bg-accent text-accent-foreground hover:bg-accent/90">
              Submit
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="min-h-[44px] px-3 sm:px-4">
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="h-4 w-4 sm:ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
