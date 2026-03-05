"use client";

import { useState, useEffect, useCallback } from "react";
import {
  GameStats,
  getDefaultStats,
  checkNewBadges,
  calculateLevel,
  XP_REWARDS,
  BADGES,
} from "@/lib/gamification";

const STORAGE_KEY = "mastertc-game-stats";

function getStoredStats(): GameStats {
  if (typeof window === "undefined") return getDefaultStats();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return getDefaultStats();
  try {
    return { ...getDefaultStats(), ...JSON.parse(stored) };
  } catch {
    return getDefaultStats();
  }
}

function saveStats(stats: GameStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function isSameDay(date1: string, date2: string): boolean {
  return date1.split("T")[0] === date2.split("T")[0];
}

function isYesterday(lastDate: string, today: string): boolean {
  const last = new Date(lastDate);
  const current = new Date(today);
  const diffTime = current.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

export interface TestCompletionData {
  correctCount: number;
  totalQuestions: number;
  totalTime: number;
  questionTimings: Record<number, number>;
  passed: boolean;
  isPerfect: boolean;
  categories: string[];
}

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>(getDefaultStats);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<string[]>([]);

  useEffect(() => {
    setStats(getStoredStats());
  }, []);

  const updateStreak = useCallback((currentStats: GameStats): GameStats => {
    const today = new Date().toISOString();
    const lastDate = currentStats.lastPracticeDate;

    if (!lastDate) {
      return {
        ...currentStats,
        currentStreak: 1,
        longestStreak: Math.max(1, currentStats.longestStreak),
        lastPracticeDate: today,
      };
    }

    if (isSameDay(lastDate, today)) {
      return { ...currentStats, lastPracticeDate: today };
    }

    if (isYesterday(lastDate, today)) {
      const newStreak = currentStats.currentStreak + 1;
      return {
        ...currentStats,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, currentStats.longestStreak),
        lastPracticeDate: today,
      };
    }

    return {
      ...currentStats,
      currentStreak: 1,
      longestStreak: currentStats.longestStreak,
      lastPracticeDate: today,
    };
  }, []);

  const completeTest = useCallback((data: TestCompletionData) => {
    setStats((prevStats) => {
      let updatedStats = { ...prevStats };

      // Update streak
      updatedStats = updateStreak(updatedStats);

      // Calculate XP earned
      let xpEarned = 0;
      xpEarned += data.correctCount * XP_REWARDS.correctAnswer;
      xpEarned += (data.totalQuestions - data.correctCount) * XP_REWARDS.incorrectAnswer;
      
      if (data.passed) {
        xpEarned += XP_REWARDS.passedTest;
      }
      
      if (data.isPerfect) {
        xpEarned += XP_REWARDS.perfectTest;
        updatedStats.perfectScores += 1;
      }

      // Speed bonus for fast questions
      const fastQuestions = Object.values(data.questionTimings).filter(t => t < 10000).length;
      xpEarned += fastQuestions * XP_REWARDS.speedBonus;

      // Streak bonus
      xpEarned += updatedStats.currentStreak * XP_REWARDS.streakBonus;

      // Update stats
      updatedStats.xp += xpEarned;
      updatedStats.totalTestsCompleted += 1;
      updatedStats.totalQuestionsAnswered += data.totalQuestions;
      updatedStats.totalCorrectAnswers += data.correctCount;
      updatedStats.totalTimeSpent += data.totalTime;

      // Update fastest times
      const fastestQuestion = Math.min(...Object.values(data.questionTimings));
      if (updatedStats.fastestQuestionTime === null || fastestQuestion < updatedStats.fastestQuestionTime) {
        updatedStats.fastestQuestionTime = fastestQuestion;
      }
      if (updatedStats.fastestTestTime === null || data.totalTime < updatedStats.fastestTestTime) {
        updatedStats.fastestTestTime = data.totalTime;
      }

      // Update category stats
      for (const category of data.categories) {
        if (!updatedStats.categoryStats[category]) {
          updatedStats.categoryStats[category] = { correct: 0, total: 0 };
        }
        updatedStats.categoryStats[category].total += 1;
      }

      // Check for new badges
      const newBadges = checkNewBadges(updatedStats);
      if (newBadges.length > 0) {
        updatedStats.unlockedBadges = [...updatedStats.unlockedBadges, ...newBadges];
        setNewlyUnlockedBadges(newBadges);
      }

      // Save to localStorage
      saveStats(updatedStats);

      return updatedStats;
    });
  }, [updateStreak]);

  const recordCategoryAnswer = useCallback((category: string, correct: boolean) => {
    setStats((prevStats) => {
      const updatedStats = { ...prevStats };
      
      if (!updatedStats.categoryStats[category]) {
        updatedStats.categoryStats[category] = { correct: 0, total: 0 };
      }
      
      updatedStats.categoryStats[category].total += 1;
      if (correct) {
        updatedStats.categoryStats[category].correct += 1;
      }

      saveStats(updatedStats);
      return updatedStats;
    });
  }, []);

  const clearNewBadges = useCallback(() => {
    setNewlyUnlockedBadges([]);
  }, []);

  const resetStats = useCallback(() => {
    const defaultStats = getDefaultStats();
    setStats(defaultStats);
    saveStats(defaultStats);
    setNewlyUnlockedBadges([]);
  }, []);

  const levelInfo = calculateLevel(stats.xp);

  const unlockedBadgeDetails = BADGES.filter((b) =>
    stats.unlockedBadges.includes(b.id)
  );

  const lockedBadges = BADGES.filter(
    (b) => !stats.unlockedBadges.includes(b.id)
  );

  return {
    stats,
    levelInfo,
    unlockedBadgeDetails,
    lockedBadges,
    newlyUnlockedBadges,
    completeTest,
    recordCategoryAnswer,
    clearNewBadges,
    resetStats,
  };
}
