"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import type { Question, TestState, TestResult, Difficulty } from "@/types/question";
import { getDifficultyForCategory } from "@/lib/difficulty";

const DEFAULT_QUESTIONS_PER_TEST = 10;
const DEFAULT_PASS_PERCENTAGE = 70;

interface TestOptions {
  questionsPerTest?: number;
  passPercentage?: number;
  difficulty?: Difficulty | "all";
}

export interface QuestionTiming {
  questionId: number;
  timeSpent: number;
  answeredCorrectly: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useTest(allQuestions: Question[], options: TestOptions = {}) {
  const questionsPerTest = options.questionsPerTest || DEFAULT_QUESTIONS_PER_TEST;
  const passPercentage = options.passPercentage || DEFAULT_PASS_PERCENTAGE;
  const difficulty = options.difficulty || "all";
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [state, setState] = useState<TestState>({
    currentQuestionIndex: 0,
    answers: {},
    showExplanation: false,
    isComplete: false,
  });

  const testStartTime = useRef<number>(Date.now());
  const questionStartTime = useRef<number>(Date.now());
  const [questionTimings, setQuestionTimings] = useState<Record<number, number>>({});
  const [totalTestTime, setTotalTestTime] = useState<number>(0);

  useEffect(() => {
    let filteredQuestions = allQuestions;
    
    if (difficulty !== "all") {
      filteredQuestions = allQuestions.filter((q) => {
        const qDifficulty = q.difficulty || getDifficultyForCategory(q.category);
        return qDifficulty === difficulty;
      });
    }
    
    const shuffled = shuffleArray(filteredQuestions);
    setTestQuestions(shuffled.slice(0, questionsPerTest));
    testStartTime.current = Date.now();
    questionStartTime.current = Date.now();
  }, [allQuestions, questionsPerTest, difficulty]);

  const currentQuestion = useMemo(
    () => testQuestions[state.currentQuestionIndex],
    [testQuestions, state.currentQuestionIndex]
  );

  const selectedAnswer = useMemo(
    () => state.answers[currentQuestion?.id] || null,
    [state.answers, currentQuestion?.id]
  );

  const selectAnswer = useCallback(
    (answerId: string) => {
      if (state.showExplanation || !currentQuestion) return;
      
      const timeSpent = Date.now() - questionStartTime.current;
      setQuestionTimings(prev => ({
        ...prev,
        [currentQuestion.id]: timeSpent,
      }));
      
      setState((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: answerId,
        },
        showExplanation: true,
      }));
    },
    [currentQuestion, state.showExplanation]
  );

  const nextQuestion = useCallback(() => {
    if (state.currentQuestionIndex < testQuestions.length - 1) {
      questionStartTime.current = Date.now();
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        showExplanation: !!prev.answers[testQuestions[prev.currentQuestionIndex + 1]?.id],
      }));
    } else {
      setTotalTestTime(Date.now() - testStartTime.current);
      setState((prev) => ({
        ...prev,
        isComplete: true,
      }));
    }
  }, [state.currentQuestionIndex, testQuestions]);

  const previousQuestion = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      questionStartTime.current = Date.now();
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        showExplanation: !!prev.answers[testQuestions[prev.currentQuestionIndex - 1]?.id],
      }));
    }
  }, [state.currentQuestionIndex, testQuestions]);

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < testQuestions.length) {
        setState((prev) => ({
          ...prev,
          currentQuestionIndex: index,
          showExplanation: !!prev.answers[testQuestions[index]?.id],
        }));
      }
    },
    [testQuestions]
  );

  const resetTest = useCallback(() => {
    const shuffled = shuffleArray(allQuestions);
    setTestQuestions(shuffled.slice(0, questionsPerTest));
    setState({
      currentQuestionIndex: 0,
      answers: {},
      showExplanation: false,
      isComplete: false,
    });
    setQuestionTimings({});
    setTotalTestTime(0);
    testStartTime.current = Date.now();
    questionStartTime.current = Date.now();
  }, [allQuestions, questionsPerTest]);

  const results = useMemo((): TestResult & { passed: boolean; passPercentage: number } => {
    const correctCount = testQuestions.reduce((count, question) => {
      const answer = state.answers[question.id];
      return answer === question.correctAnswer ? count + 1 : count;
    }, 0);

    const answersWithResults = testQuestions.reduce(
      (acc, question) => {
        const selected = state.answers[question.id] || "";
        acc[question.id] = {
          selected,
          correct: question.correctAnswer,
          isCorrect: selected === question.correctAnswer,
        };
        return acc;
      },
      {} as TestResult["answers"]
    );

    const percentage = testQuestions.length > 0 
      ? Math.round((correctCount / testQuestions.length) * 100)
      : 0;

    return {
      totalQuestions: testQuestions.length,
      correctCount,
      incorrectCount: testQuestions.length - correctCount,
      percentage,
      answers: answersWithResults,
      passed: percentage >= passPercentage,
      passPercentage,
    };
  }, [testQuestions, state.answers, passPercentage]);

  const timingStats = useMemo(() => {
    const times = Object.values(questionTimings);
    if (times.length === 0) return { average: 0, fastest: 0, slowest: 0 };
    
    return {
      average: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
      fastest: Math.min(...times),
      slowest: Math.max(...times),
    };
  }, [questionTimings]);

  const answeredCount = Object.keys(state.answers).length;
  const canGoNext = state.showExplanation;
  const canGoPrevious = state.currentQuestionIndex > 0;
  const isLastQuestion = state.currentQuestionIndex === testQuestions.length - 1;

  return {
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    selectedAnswer,
    showExplanation: state.showExplanation,
    isComplete: state.isComplete,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    resetTest,
    results,
    answeredCount,
    totalQuestions: testQuestions.length,
    totalQuestionsInBank: allQuestions.length,
    canGoNext,
    canGoPrevious,
    isLastQuestion,
    questionsPerTest,
    passPercentage,
    questionTimings,
    totalTestTime,
    timingStats,
  };
}
