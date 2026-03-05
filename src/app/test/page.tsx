"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, Home, Clock, Trophy, Zap, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard, ProgressBar } from "@/components/quiz";
import { useTest } from "@/hooks/use-test";
import { useGameStats } from "@/hooks/use-game-stats";
import { BADGES } from "@/lib/gamification";
import { getDifficultyForCategory } from "@/lib/difficulty";
import questionsData from "@/data/questions.json";
import type { Question, Difficulty } from "@/types/question";

const questions = questionsData as Question[];

function countQuestionsByDifficulty(qs: Question[]): Record<string, number> {
  const counts = { all: qs.length, easy: 0, medium: 0, hard: 0 };
  qs.forEach((q) => {
    const diff = q.difficulty || getDifficultyForCategory(q.category);
    counts[diff]++;
  });
  return counts;
}

const difficultyCounts = countQuestionsByDifficulty(questions);

interface LeaderboardEntry {
  name: string;
  score: number;
  time: number;
  date: string;
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}

function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("mastertc-leaderboard");
  return stored ? JSON.parse(stored) : [];
}

function saveToLeaderboard(entry: LeaderboardEntry): LeaderboardEntry[] {
  const leaderboard = getLeaderboard();
  leaderboard.push(entry);
  leaderboard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.time - b.time;
  });
  const top10 = leaderboard.slice(0, 10);
  localStorage.setItem("mastertc-leaderboard", JSON.stringify(top10));
  return top10;
}

export default function TestPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "all">("all");
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
    questionTimings,
  } = useTest(questions, { difficulty: hasStarted ? selectedDifficulty : "all" });

  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const hasRecordedStats = useRef(false);

  const {
    stats,
    levelInfo,
    newlyUnlockedBadges,
    completeTest,
    clearNewBadges,
  } = useGameStats();

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  // Record game stats when test completes
  useEffect(() => {
    if (isComplete && !hasRecordedStats.current && totalTestTime > 0) {
      hasRecordedStats.current = true;
      completeTest({
        correctCount: results.correctCount,
        totalQuestions: results.totalQuestions,
        totalTime: totalTestTime,
        questionTimings: questionTimings,
        passed: results.passed,
        isPerfect: results.percentage === 100,
        categories: [],
      });
    }
  }, [isComplete, totalTestTime, results, completeTest, questionTimings]);

  const handleSubmitScore = () => {
    if (!playerName.trim()) return;
    const entry: LeaderboardEntry = {
      name: playerName.trim(),
      score: results.percentage,
      time: totalTestTime,
      date: new Date().toLocaleDateString(),
    };
    const updated = saveToLeaderboard(entry);
    setLeaderboard(updated);
    setHasSubmitted(true);
  };

  // Start screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent flex items-center justify-center">
                  <span className="text-xl font-black text-accent-foreground">M</span>
                </div>
                <span className="font-display text-xl font-bold tracking-tight hidden sm:block">MASTERTC</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md text-center space-y-10"
          >
            <div className="space-y-3">
              <h1 className="font-display text-5xl font-bold">Practice</h1>
              <p className="text-muted-foreground">10 questions · 70% to pass</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {[
                { key: "all", label: "All", count: difficultyCounts.all },
                { key: "easy", label: "Easy", count: difficultyCounts.easy },
                { key: "medium", label: "Medium", count: difficultyCounts.medium },
                { key: "hard", label: "Hard", count: difficultyCounts.hard },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSelectedDifficulty(item.key as Difficulty | "all")}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    selectedDifficulty === item.key
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span className="ml-1.5 opacity-60">{item.count}</span>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setHasStarted(true)}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-base"
            >
              Start
            </Button>

            <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }
    if (!playerName.trim()) return;
    const entry: LeaderboardEntry = {
      name: playerName.trim(),
      score: results.percentage,
      time: totalTestTime,
      date: new Date().toLocaleDateString(),
    };
    const updated = saveToLeaderboard(entry);
    setLeaderboard(updated);
    setHasSubmitted(true);
  };

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
                  <span className="text-xl font-black text-accent-foreground">M</span>
                </div>
                <span className="font-display text-xl font-bold tracking-tight hidden sm:block">MASTERTC</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 border border-border">
                <div className="text-2xl font-display font-bold text-accent">{results.correctCount}</div>
                <div className="text-xs text-muted-foreground mt-1">Correct</div>
              </div>
              <div className="text-center p-4 bg-muted/30 border border-border">
                <div className="text-2xl font-display font-bold">{results.incorrectCount}</div>
                <div className="text-xs text-muted-foreground mt-1">Incorrect</div>
              </div>
              <div className="text-center p-4 bg-muted/30 border border-border">
                <div className="text-2xl font-display font-bold flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {formatTime(totalTestTime)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Total Time</div>
              </div>
              <div className="text-center p-4 bg-muted/30 border border-border">
                <div className="text-2xl font-display font-bold flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4 text-muted-foreground" />
                  {formatTime(timingStats.average)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Avg/Question</div>
              </div>
            </div>

            {/* Time Stats */}
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div>Fastest: <span className="text-foreground font-medium">{formatTime(timingStats.fastest)}</span></div>
              <div>Slowest: <span className="text-foreground font-medium">{formatTime(timingStats.slowest)}</span></div>
            </div>

            {/* XP and Level */}
            <div className="bg-muted/30 border border-border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="font-bold">Level {levelInfo.level}</span>
                  <span className="text-muted-foreground">· {levelInfo.name}</span>
                </div>
                <span className="text-accent font-bold">{stats.xp} XP</span>
              </div>
              <div className="h-2 bg-muted">
                <div 
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${levelInfo.progress}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {levelInfo.currentXp} / {levelInfo.nextLevelXp} XP to next level
              </div>
            </div>

            {/* New Badges */}
            {newlyUnlockedBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-accent/10 border border-accent p-4 space-y-3"
              >
                <div className="flex items-center gap-2 text-accent">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold">New Badge{newlyUnlockedBadges.length > 1 ? 's' : ''} Unlocked!</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {newlyUnlockedBadges.map((badgeId) => {
                    const badge = BADGES.find((b) => b.id === badgeId);
                    if (!badge) return null;
                    return (
                      <div key={badgeId} className="flex items-center gap-2 bg-background px-3 py-2 border border-border">
                        <span className="text-2xl">{badge.icon}</span>
                        <div>
                          <div className="font-medium text-sm">{badge.name}</div>
                          <div className="text-xs text-muted-foreground">{badge.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            <p className="text-center text-sm text-muted-foreground">
              Required: {passPercentage}% · From {totalQuestionsInBank} total questions
            </p>

            <div className="h-px bg-border" />

            {/* Leaderboard Entry */}
            {!hasSubmitted ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  <span className="font-bold">Add to Leaderboard</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmitScore()}
                    className="flex-1 px-4 py-2 bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                    maxLength={20}
                  />
                  <Button onClick={handleSubmitScore} disabled={!playerName.trim()}>
                    Submit
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-sm text-accent font-medium">
                Score submitted!
              </div>
            )}

            {/* Leaderboard */}
            {leaderboard.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  <span className="font-bold">Top 10 Leaderboard</span>
                </div>
                <div className="border border-border divide-y divide-border">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between px-4 py-3 ${
                        index === 0 ? "bg-accent/10" : index < 3 ? "bg-muted/30" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 text-center font-bold ${
                          index === 0 ? "text-accent" : "text-muted-foreground"
                        }`}>
                          {index + 1}
                        </span>
                        <span className="font-medium">{entry.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">{formatTime(entry.time)}</span>
                        <span className={`font-bold ${entry.score >= 70 ? "text-accent" : ""}`}>
                          {entry.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="h-px bg-border" />

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setHasSubmitted(false);
                  setPlayerName("");
                  hasRecordedStats.current = false;
                  clearNewBadges();
                  resetTest();
                }} 
                className={`w-full ${isPassed ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`}
                size="lg"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {isPassed ? "Practice Again" : "Try Again"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setHasSubmitted(false);
                  setPlayerName("");
                  hasRecordedStats.current = false;
                  clearNewBadges();
                  setHasStarted(false);
                }}
                className="w-full"
                size="lg"
              >
                Change Difficulty
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
                <span className="text-xl font-black text-accent-foreground">M</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight hidden sm:block">MASTERTC</span>
            </Link>
            <div className="flex items-center gap-4">
              {selectedDifficulty !== "all" && (
                <span className={`text-xs font-bold uppercase px-2 py-1 ${
                  selectedDifficulty === "easy" ? "bg-green-500/20 text-green-500" :
                  selectedDifficulty === "medium" ? "bg-yellow-500/20 text-yellow-500" :
                  "bg-red-500/20 text-red-500"
                }`}>
                  {selectedDifficulty}
                </span>
              )}
              <span className="text-sm text-muted-foreground hidden sm:block">
                {passPercentage}% to pass
              </span>
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
