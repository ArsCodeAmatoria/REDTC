"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, ExternalLink, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import loadChartData from "@/data/load-chart-questions.json";

interface Option {
  id: string;
  text: string;
  explanation: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswer: string;
}

interface Chart {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  pdfFile: string;
  description: string;
  questions: Question[];
}

export default function LoadChartQuizPage() {
  const params = useParams();
  const router = useRouter();
  const chartId = params.id as string;
  
  const [chart, setChart] = useState<Chart | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const foundChart = loadChartData.charts.find((c) => c.id === chartId);
    if (foundChart) {
      setChart(foundChart as Chart);
    }
  }, [chartId]);

  if (!chart) {
    return (
      <div className="min-h-screen pt-14">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-muted-foreground">Loading chart...</p>
        </main>
      </div>
    );
  }

  const currentQuestion = chart.questions[currentQuestionIndex];
  const totalQuestions = chart.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectAnswer = (answerId: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    setShowExplanation(true);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer,
    }));
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setIsComplete(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const correctCount = Object.entries(answers).filter(
    ([questionId, answer]) => {
      const question = chart.questions.find((q) => q.id === parseInt(questionId));
      return question?.correctAnswer === answer;
    }
  ).length;

  const passRate = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const passed = passRate >= 70;

  if (isComplete) {
    return (
      <div className="min-h-screen pt-14">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
              passed ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
            }`}>
              {passed ? <Check className="w-10 h-10" /> : <X className="w-10 h-10" />}
            </div>
            
            <h1 className="font-display text-3xl font-bold mb-2">
              {passed ? "Quiz Complete!" : "Keep Practicing"}
            </h1>
            
            <p className="text-muted-foreground mb-6">
              {chart.name} Load Chart Quiz
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold">{correctCount}/{totalQuestions}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold">{passRate.toFixed(0)}%</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
              <div className={`p-4 border rounded-lg ${
                passed ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"
              }`}>
                <div className="text-2xl font-bold">{passed ? "PASS" : "FAIL"}</div>
                <div className="text-xs text-muted-foreground">70% required</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setShowExplanation(false);
                  setAnswers({});
                  setIsComplete(false);
                }}
              >
                Retry Quiz
              </Button>
              <Link href="/load-charts">
                <Button>
                  Back to Charts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/load-charts"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Charts
          </Link>
          
          <a
            href={`/load-charts/${chart.pdfFile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
          >
            <FileText className="h-4 w-4" />
            Open Chart
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {chart.manufacturer} {chart.model}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-display text-xl font-semibold">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h1>
          </div>
        </div>

        <div className="w-full h-1 bg-muted rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="p-6 border border-border rounded-lg">
            <h2 className="font-display text-lg sm:text-xl font-medium leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === currentQuestion.correctAnswer;
              const showResult = showExplanation;

              let borderColor = "border-border";
              let bgColor = "bg-transparent";
              
              if (showResult) {
                if (isCorrect) {
                  borderColor = "border-green-500";
                  bgColor = "bg-green-500/10";
                } else if (isSelected && !isCorrect) {
                  borderColor = "border-red-500";
                  bgColor = "bg-red-500/10";
                }
              } else if (isSelected) {
                borderColor = "border-accent";
                bgColor = "bg-accent/10";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectAnswer(option.id)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 border rounded-lg transition-all ${borderColor} ${bgColor} ${
                    !showExplanation ? "hover:border-accent/50 hover:bg-muted/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-current text-sm font-medium">
                      {option.id.toUpperCase()}
                    </span>
                    <div className="flex-1">
                      <span className="font-medium">{option.text}</span>
                      {showResult && (
                        <p className={`text-sm mt-2 ${isCorrect ? "text-green-400" : "text-muted-foreground"}`}>
                          {option.explanation}
                        </p>
                      )}
                    </div>
                    {showResult && isCorrect && (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            {!showExplanation ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
              >
                Check Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {isLastQuestion ? "See Results" : "Next Question"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
