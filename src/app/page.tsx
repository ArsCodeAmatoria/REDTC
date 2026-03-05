"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Target, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

const categories = [
  { name: "Safety & Legislation", count: 20, color: "bg-accent" },
  { name: "Load Charts & Calculations", count: 30, color: "bg-foreground" },
  { name: "Rigging & Slinging", count: 30, color: "bg-foreground" },
  { name: "Crane Components", count: 30, color: "bg-foreground" },
  { name: "Site Operations", count: 30, color: "bg-foreground" },
  { name: "Inspection & Maintenance", count: 20, color: "bg-foreground" },
  { name: "Climbing & Erection", count: 20, color: "bg-foreground" },
  { name: "Troubleshooting", count: 20, color: "bg-foreground" },
];

const features = [
  {
    label: "Practice",
    title: "200 exam questions with detailed explanations",
    description: "Every question includes why the correct answer is right and why others are wrong.",
  },
  {
    label: "Learn",
    title: "Aligned with BC Red Seal standards",
    description: "Questions based on WorkSafeBC regulations and certification requirements.",
  },
  {
    label: "Pass",
    title: "70% pass rate mirrors real exam",
    description: "Practice tests simulate actual exam conditions with randomized questions.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent flex items-center justify-center">
                <span className="font-display text-sm font-black text-accent-foreground">R</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight hidden sm:block">REDTC</span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link href="/test" className="px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                Practice
              </Link>
              <Link href="/test/review" className="px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                Questions
              </Link>
              <div className="w-px h-6 bg-border mx-2 hidden sm:block" />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2">
            {/* Left Column - Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20 lg:border-r border-border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className="category-label">BC Red Seal</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Tower Crane Certification</span>
                </div>
                
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                  Master your tower crane exam
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Practice with 200 questions covering everything from load charts to safety regulations. 
                  Get instant feedback and detailed explanations.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/test">
                    <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                      Start Practice Test
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/test/review">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Browse All Questions
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Stats Card */}
            <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-muted/30">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <span className="category-label">Test Format</span>
                  <p className="text-sm text-muted-foreground mt-1">Updated for 2026 standards</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-4xl font-display font-bold">200</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-display font-bold">10</div>
                    <div className="text-sm text-muted-foreground">Per Test</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-display font-bold">70%</div>
                    <div className="text-sm text-muted-foreground">To Pass</div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-4">
                  <p className="text-sm font-medium">What you&apos;ll learn:</p>
                  <ul className="space-y-2">
                    {["Load charts & calculations", "Safety regulations", "Rigging fundamentals", "Crane operations"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Vox Style Cards */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="py-6 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0"
              >
                <span className="category-label">{feature.label}</span>
                <h3 className="font-display text-lg font-semibold mt-2 mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="category-label">Topics</span>
              <h2 className="font-display text-2xl font-bold mt-1">Question Categories</h2>
            </div>
            <Link href="/test/review" className="hidden sm:flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors">
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link href="/test/review">
                  <div className="bg-background p-5 h-full card-hover group">
                    <div className="flex items-start justify-between">
                      <div className={`w-2 h-2 mt-1 ${index === 0 ? 'bg-accent' : 'bg-muted-foreground/30'}`} />
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-medium mt-3 group-hover:text-accent transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.count}+ questions</p>
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
            <span className="category-label">Ready?</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Start practicing now
            </h2>
            <p className="text-muted-foreground">
              10 random questions · 70% to pass · Instant explanations
            </p>
            <div className="pt-2">
              <Link href="/test">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Begin Test
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
