"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Home, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/quiz";
import questionsData from "@/data/questions.json";
import type { Question } from "@/types/question";

const questions = questionsData as Question[];

const categories = [
  "All Questions",
  "Safety & Legislation",
  "Load Charts & Calculations",
  "Advanced Load Charts & Math",
  "Rigging & Slinging",
  "Rigging Calculations & Angles",
  "Crane Components & Operation",
  "Structural & Mechanical Systems",
  "Electrical & Safety Systems",
  "Communication & Site Conditions",
  "Site Operations & Planning",
  "Inspection & Maintenance",
  "Advanced Load Theory",
  "Climbing & Erection",
  "Communication & Supervision",
  "Advanced Failure Scenarios",
  "Regulations, Standards & Responsibilities",
  "Load Calculations & Theory",
  "Rigging Practices",
  "Operational Hazards",
  "Troubleshooting & Failure Prevention",
  "Structural & Stability Principles",
  "Hoisting & Mechanical Systems",
  "Advanced Rigging & Load Control",
  "Environmental & Site Hazards",
  "Emergency & Abnormal Situations",
  "Master - Advanced Load Calculations",
  "Master - Structural Engineering",
  "Master - Rigging",
  "Master - Mechanical Systems",
  "Master - Environmental Risk",
  "Master - Emergency Response",
];

export default function ReviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Questions");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === "All Questions") {
      return questions;
    }
    return questions.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQuestion = filteredQuestions[currentIndex];

  const goToNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setIsDropdownOpen(false);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No questions found in this category.</p>
          <Button onClick={() => handleCategoryChange("All Questions")} className="bg-accent text-accent-foreground">
            View All Questions
          </Button>
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
              <span className="font-display text-xl font-bold tracking-tight hidden sm:block">Master TC</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/test">
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 hidden sm:flex">
                  Start Test
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Title Bar */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="category-label">Question Bank</span>
              <h1 className="font-display text-2xl font-bold mt-1">Review Mode</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredQuestions.length} questions
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-auto flex items-center justify-between gap-4 px-4 py-3 border border-border bg-background hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent" />
                <span className="font-medium text-sm">{selectedCategory}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 sm:right-auto sm:min-w-[300px] mt-1 bg-background border border-border shadow-lg z-40 max-h-[400px] overflow-y-auto"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-2 ${
                      selectedCategory === category
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 ${selectedCategory === category ? 'bg-accent-foreground' : 'bg-muted-foreground/30'}`} />
                    {category}
                    {category === "All Questions" && (
                      <span className={`ml-auto ${selectedCategory === category ? 'text-accent-foreground/70' : 'text-muted-foreground'}`}>
                        {questions.length}
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={currentQuestion.correctAnswer}
          showExplanation={true}
          onSelectAnswer={() => {}}
          questionNumber={currentIndex + 1}
          totalQuestions={filteredQuestions.length}
          isReviewMode={true}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {filteredQuestions.length}
          </span>

          <Button
            onClick={goToNext}
            disabled={currentIndex === filteredQuestions.length - 1}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Back to Home */}
        <div className="mt-8 pt-8 border-t border-border">
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
