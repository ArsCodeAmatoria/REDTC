"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Clock, Trash2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function ScoresPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  const clearLeaderboard = () => {
    localStorage.removeItem("mastertc-leaderboard");
    setLeaderboard([]);
  };

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
              <span className="font-display text-xl font-bold tracking-tight hidden sm:block">Master TC</span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-3">
              <Link href="/test" className="px-3 py-2 text-sm font-bold hover:bg-muted transition-colors">
                Practice
              </Link>
              <Link href="/scores" className="px-3 py-2 text-sm font-bold bg-muted">
                Scores
              </Link>
            </nav>
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
          {/* Title */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-accent" />
              <h1 className="font-display text-4xl md:text-5xl font-bold">High Scores</h1>
            </div>
            <p className="text-muted-foreground">Top 10 practice test scores</p>
          </div>

          {/* Leaderboard */}
          {leaderboard.length > 0 ? (
            <div className="space-y-4">
              <div className="border border-border">
                {/* Header */}
                <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-muted/50 border-b border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Name</div>
                  <div className="col-span-3 text-right">Time</div>
                  <div className="col-span-3 text-right">Score</div>
                </div>
                
                {/* Entries */}
                <div className="divide-y divide-border">
                  {leaderboard.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`grid grid-cols-12 gap-2 px-4 py-4 items-center ${
                        index === 0 ? "bg-accent/10" : index < 3 ? "bg-muted/30" : ""
                      }`}
                    >
                      <div className="col-span-1">
                        <span className={`font-bold ${
                          index === 0 ? "text-accent text-lg" : index < 3 ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="col-span-5">
                        <span className="font-medium truncate block">{entry.name}</span>
                        <span className="text-xs text-muted-foreground">{entry.date}</span>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-sm text-muted-foreground flex items-center justify-end gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(entry.time)}
                        </span>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className={`text-xl font-display font-bold ${
                          entry.score >= 70 ? "text-accent" : ""
                        }`}>
                          {entry.score}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={clearLeaderboard}
                className="text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Leaderboard
              </Button>
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted flex items-center justify-center">
                <Trophy className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No scores yet. Complete a practice test to get on the leaderboard!</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/test" className="flex-1">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                Take Practice Test
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full" size="lg">
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
