"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Star, 
  Trophy, 
  Flame, 
  Clock, 
  Target, 
  Zap, 
  BarChart3,
  Home,
  Trash2,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGameStats } from "@/hooks/use-game-stats";
import { BADGES, LEVELS } from "@/lib/gamification";

function formatTime(ms: number): string {
  if (ms === null) return "--";
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

export default function ProfilePage() {
  const {
    stats,
    levelInfo,
    unlockedBadgeDetails,
    lockedBadges,
    resetStats,
  } = useGameStats();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 bg-accent animate-pulse" />
      </div>
    );
  }

  const accuracy = stats.totalQuestionsAnswered > 0 
    ? Math.round((stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100)
    : 0;

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
            <nav className="flex items-center gap-1 sm:gap-3">
              <Link href="/test" className="px-3 py-2 text-sm font-bold hover:bg-muted transition-colors">
                Practice
              </Link>
              <Link href="/profile" className="px-3 py-2 text-sm font-bold bg-muted">
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Level Card */}
          <div className="bg-muted/30 border border-border p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-accent flex items-center justify-center">
                    <Star className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Level {levelInfo.level}</div>
                    <h1 className="font-display text-3xl font-bold">{levelInfo.name}</h1>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-display font-bold text-accent">{stats.xp}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to Level {Math.min(levelInfo.level + 1, 10)}</span>
                <span>{levelInfo.currentXp} / {levelInfo.nextLevelXp} XP</span>
              </div>
              <div className="h-3 bg-muted">
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelInfo.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Level Progress Indicators */}
            <div className="flex justify-between pt-2">
              {LEVELS.slice(0, 10).map((level, i) => (
                <div 
                  key={level.level}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${
                    levelInfo.level >= level.level 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}
                  title={level.name}
                >
                  {level.level}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 border border-border p-4 text-center">
              <Target className="w-6 h-6 mx-auto text-accent mb-2" />
              <div className="text-2xl font-display font-bold">{stats.totalTestsCompleted}</div>
              <div className="text-xs text-muted-foreground">Tests Completed</div>
            </div>
            <div className="bg-muted/30 border border-border p-4 text-center">
              <BarChart3 className="w-6 h-6 mx-auto text-accent mb-2" />
              <div className="text-2xl font-display font-bold">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Overall Accuracy</div>
            </div>
            <div className="bg-muted/30 border border-border p-4 text-center">
              <Flame className="w-6 h-6 mx-auto text-accent mb-2" />
              <div className="text-2xl font-display font-bold">{stats.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="bg-muted/30 border border-border p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto text-accent mb-2" />
              <div className="text-2xl font-display font-bold">{stats.perfectScores}</div>
              <div className="text-xs text-muted-foreground">Perfect Scores</div>
            </div>
          </div>

          {/* More Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 border border-border p-4 text-center">
              <div className="text-xl font-display font-bold">{stats.totalQuestionsAnswered}</div>
              <div className="text-xs text-muted-foreground">Questions Answered</div>
            </div>
            <div className="bg-muted/30 border border-border p-4 text-center">
              <div className="text-xl font-display font-bold text-accent">{stats.totalCorrectAnswers}</div>
              <div className="text-xs text-muted-foreground">Correct Answers</div>
            </div>
            <div className="bg-muted/30 border border-border p-4 text-center">
              <div className="text-xl font-display font-bold">{formatTime(stats.totalTimeSpent)}</div>
              <div className="text-xs text-muted-foreground">Total Time</div>
            </div>
            <div className="bg-muted/30 border border-border p-4 text-center">
              <div className="text-xl font-display font-bold">{stats.longestStreak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
          </div>

          {/* Speed Records */}
          {(stats.fastestQuestionTime || stats.fastestTestTime) && (
            <div className="bg-muted/30 border border-border p-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-accent" />
                <span className="font-bold">Speed Records</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-display font-bold">{formatTime(stats.fastestQuestionTime || 0)}</div>
                  <div className="text-xs text-muted-foreground">Fastest Answer</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold">{formatTime(stats.fastestTestTime || 0)}</div>
                  <div className="text-xs text-muted-foreground">Fastest Test</div>
                </div>
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="font-bold">Badges</span>
              <span className="text-muted-foreground text-sm">({unlockedBadgeDetails.length}/{BADGES.length})</span>
            </div>

            {/* Unlocked Badges */}
            {unlockedBadgeDetails.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {unlockedBadgeDetails.map((badge) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-accent/10 border border-accent p-3 text-center"
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="font-medium text-sm">{badge.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Locked Badges */}
            {lockedBadges.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {lockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-muted/30 border border-border p-3 text-center opacity-50"
                  >
                    <div className="text-3xl mb-2 grayscale">
                      <Lock className="w-8 h-8 mx-auto text-muted-foreground" />
                    </div>
                    <div className="font-medium text-sm text-muted-foreground">{badge.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Mastery */}
          {Object.keys(stats.categoryStats).length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                <span className="font-bold">Category Mastery</span>
              </div>
              <div className="space-y-3">
                {Object.entries(stats.categoryStats).map(([category, data]) => {
                  const percentage = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                  return (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{category}</span>
                        <span className="text-muted-foreground">{data.correct}/{data.total} ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-muted">
                        <div 
                          className={`h-full transition-all ${percentage >= 70 ? 'bg-accent' : 'bg-foreground/50'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Link href="/test" className="flex-1">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                Continue Practicing
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full" size="lg">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Reset */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
                  resetStats();
                }
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Reset All Progress
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
