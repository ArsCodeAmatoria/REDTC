"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Home, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/quiz";
import { Header } from "@/components/layout/header";
import questionsData from "@/data/questions.json";
import loadChartData from "@/data/load-chart-questions.json";
import type { Question } from "@/types/question";
import { EXAM_LABELS, type ExamId } from "@/data/exam-tracks";

const questions: Question[] = [
  ...(questionsData as Question[]),
  ...(() => {
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
  })(),
];

const categories = [
  "All Questions",
  "PDF Load Charts",
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
  "Cab Controls & LMI",
  "Self-Erect & Remote Operation",
  "Test Blocks & Commissioning",
  "Advanced Load Theory",
  "Climbing & Erection",
  "Tower Crane Erection",
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

const examFilters: { id: "all" | ExamId; label: string }[] = [
  { id: "all", label: "All exams" },
  { id: "b", label: EXAM_LABELS.b },
  { id: "l1", label: EXAM_LABELS.l1 },
  { id: "l2", label: EXAM_LABELS.l2 },
  { id: "ip", label: EXAM_LABELS.ip },
  { id: "lcr", label: EXAM_LABELS.lcr },
];

export default function ReviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Questions");
  const [selectedExam, setSelectedExam] = useState<"all" | ExamId>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const catOk =
        selectedCategory === "All Questions" ||
        (selectedCategory === "PDF Load Charts"
          ? Boolean(q.category?.startsWith("Load Chart:"))
          : q.category === selectedCategory);
      const examOk =
        selectedExam === "all" || (q.exams && q.exams.includes(selectedExam));
      return catOk && examOk;
    });
  }, [selectedCategory, selectedExam]);

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
          <p className="text-muted-foreground">No questions found for this filter.</p>
          <Button
            onClick={() => {
              setSelectedCategory("All Questions");
              setSelectedExam("all");
              setCurrentIndex(0);
            }}
            className="bg-accent text-accent-foreground"
          >
            View All Questions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14">
      <Header />

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
        <div className="max-w-3xl mx-auto px-4 py-4 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {examFilters.map((exam) => (
              <button
                key={exam.id}
                type="button"
                onClick={() => {
                  setSelectedExam(exam.id);
                  setCurrentIndex(0);
                }}
                className={`px-2.5 py-1 text-xs font-medium border ${
                  selectedExam === exam.id
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {exam.label}
              </button>
            ))}
          </div>
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
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
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-border gap-2">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="min-h-[44px] px-3 sm:px-4"
          >
            <ArrowLeft className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {currentIndex + 1} / {filteredQuestions.length}
          </span>

          <Button
            onClick={goToNext}
            disabled={currentIndex === filteredQuestions.length - 1}
            className="min-h-[44px] px-3 sm:px-4"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="h-4 w-4 sm:ml-2" />
          </Button>
        </div>

        {/* Back to Home */}
        <div className="mt-8 pt-8 border-t border-border">
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full min-h-[44px]">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
