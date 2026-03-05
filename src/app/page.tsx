"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

const categories = [
  { name: "Safety & Legislation", count: 20 },
  { name: "Load Charts & Calculations", count: 30 },
  { name: "Rigging & Slinging", count: 30 },
  { name: "Crane Components", count: 30 },
  { name: "Site Operations", count: 30 },
  { name: "Inspection & Maintenance", count: 20 },
  { name: "Climbing & Erection", count: 20 },
  { name: "Troubleshooting", count: 20 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold tracking-tight">REDTC</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/test" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Practice Test
              </Link>
              <Link href="/test/review" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Question Bank
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="editorial-label">BC Red Seal Certification</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                Tower Crane
                <br />
                <span className="text-muted-foreground">Exam Practice</span>
              </h1>
              <p className="editorial-subtitle max-w-lg">
                Master your Red Seal Tower Crane certification with 200 practice questions, 
                detailed explanations, and instant feedback.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/test">
                  <Button size="lg" className="w-full sm:w-auto group text-base px-8">
                    Start Practice Test
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/test/review">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Browse Questions
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="border border-border bg-card p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="editorial-label">Test Format</span>
                  <span className="text-sm text-muted-foreground">Updated 2026</span>
                </div>
                <Separator />
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-display font-bold">200</div>
                    <div className="text-sm text-muted-foreground mt-1">Questions</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-bold">10</div>
                    <div className="text-sm text-muted-foreground mt-1">Per Test</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-bold">70%</div>
                    <div className="text-sm text-muted-foreground mt-1">To Pass</div>
                  </div>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">
                  Questions aligned with BC WorkSafeBC regulations and Red Seal certification standards.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="w-12 h-12 border border-border flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold">Targeted Practice</h3>
              <p className="text-muted-foreground">
                Each test randomly selects 10 questions from our bank, ensuring varied practice sessions every time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="w-12 h-12 border border-border flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold">Instant Feedback</h3>
              <p className="text-muted-foreground">
                Get immediate explanations for every answer, understanding why correct answers are right and others are wrong.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="w-12 h-12 border border-border flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold">Learn at Your Pace</h3>
              <p className="text-muted-foreground">
                No time limits. Take as long as you need to understand each concept thoroughly before moving on.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="editorial-label mb-2">Question Categories</p>
              <h2 className="font-display text-3xl font-bold">Topics Covered</h2>
            </div>
            <Link href="/test/review" className="hidden sm:block">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href="/test/review">
                  <div className="border border-border p-4 card-hover group">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{category.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-2xl font-display font-bold mt-2">{category.count}+</div>
                    <div className="text-xs text-muted-foreground">questions</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="editorial-label">Ready to Practice?</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Start your test now
            </h2>
            <p className="editorial-subtitle">
              10 random questions. 70% to pass. Detailed explanations for every answer.
            </p>
            <div className="pt-4">
              <Link href="/test">
                <Button size="lg" className="text-base px-10 group">
                  Begin Test
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
