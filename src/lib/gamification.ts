export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: GameStats) => boolean;
}

export interface GameStats {
  xp: number;
  totalTestsCompleted: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  perfectScores: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  fastestTestTime: number | null;
  fastestQuestionTime: number | null;
  categoryStats: Record<string, { correct: number; total: number }>;
  unlockedBadges: string[];
  totalTimeSpent: number;
}

export const LEVELS = [
  { level: 1, name: "Apprentice", xpRequired: 0 },
  { level: 2, name: "Ground Crew", xpRequired: 100 },
  { level: 3, name: "Signalperson", xpRequired: 250 },
  { level: 4, name: "Rigger", xpRequired: 500 },
  { level: 5, name: "Junior Operator", xpRequired: 1000 },
  { level: 6, name: "Operator", xpRequired: 2000 },
  { level: 7, name: "Senior Operator", xpRequired: 3500 },
  { level: 8, name: "Foreman", xpRequired: 5500 },
  { level: 9, name: "Crane Master", xpRequired: 8000 },
  { level: 10, name: "Red Seal Champion", xpRequired: 12000 },
];

export const BADGES: Badge[] = [
  {
    id: "first-test",
    name: "First Steps",
    description: "Complete your first practice test",
    icon: "🎯",
    condition: (stats) => stats.totalTestsCompleted >= 1,
  },
  {
    id: "first-pass",
    name: "Certified",
    description: "Pass a test with 70% or higher",
    icon: "✅",
    condition: (stats) => stats.totalTestsCompleted >= 1 && (stats.totalCorrectAnswers / Math.max(stats.totalQuestionsAnswered, 1)) >= 0.7,
  },
  {
    id: "perfect-10",
    name: "Perfect 10",
    description: "Score 100% on a practice test",
    icon: "💯",
    condition: (stats) => stats.perfectScores >= 1,
  },
  {
    id: "five-tests",
    name: "Dedicated",
    description: "Complete 5 practice tests",
    icon: "📚",
    condition: (stats) => stats.totalTestsCompleted >= 5,
  },
  {
    id: "ten-tests",
    name: "Committed",
    description: "Complete 10 practice tests",
    icon: "🏆",
    condition: (stats) => stats.totalTestsCompleted >= 10,
  },
  {
    id: "hundred-questions",
    name: "Century",
    description: "Answer 100 questions",
    icon: "💪",
    condition: (stats) => stats.totalQuestionsAnswered >= 100,
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Answer a question in under 5 seconds",
    icon: "⚡",
    condition: (stats) => stats.fastestQuestionTime !== null && stats.fastestQuestionTime < 5000,
  },
  {
    id: "streak-3",
    name: "On Fire",
    description: "Practice 3 days in a row",
    icon: "🔥",
    condition: (stats) => stats.longestStreak >= 3,
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "Practice 7 days in a row",
    icon: "⭐",
    condition: (stats) => stats.longestStreak >= 7,
  },
  {
    id: "all-categories",
    name: "Well Rounded",
    description: "Answer questions from all 5 categories",
    icon: "🎓",
    condition: (stats) => Object.keys(stats.categoryStats).length >= 5,
  },
];

export const XP_REWARDS = {
  correctAnswer: 10,
  incorrectAnswer: 2,
  perfectTest: 50,
  passedTest: 25,
  speedBonus: 5, // under 10 seconds
  streakBonus: 10, // per day of streak
};

export function calculateLevel(xp: number): { level: number; name: string; currentXp: number; nextLevelXp: number; progress: number } {
  let currentLevel = LEVELS[0];
  let nextLevel = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || LEVELS[i];
      break;
    }
  }

  const xpIntoLevel = xp - currentLevel.xpRequired;
  const xpForNextLevel = nextLevel.xpRequired - currentLevel.xpRequired;
  const progress = xpForNextLevel > 0 ? (xpIntoLevel / xpForNextLevel) * 100 : 100;

  return {
    level: currentLevel.level,
    name: currentLevel.name,
    currentXp: xpIntoLevel,
    nextLevelXp: xpForNextLevel,
    progress: Math.min(progress, 100),
  };
}

export function getDefaultStats(): GameStats {
  return {
    xp: 0,
    totalTestsCompleted: 0,
    totalQuestionsAnswered: 0,
    totalCorrectAnswers: 0,
    perfectScores: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
    fastestTestTime: null,
    fastestQuestionTime: null,
    categoryStats: {},
    unlockedBadges: [],
    totalTimeSpent: 0,
  };
}

export function checkNewBadges(stats: GameStats): string[] {
  const newBadges: string[] = [];
  
  for (const badge of BADGES) {
    if (!stats.unlockedBadges.includes(badge.id) && badge.condition(stats)) {
      newBadges.push(badge.id);
    }
  }
  
  return newBadges;
}
