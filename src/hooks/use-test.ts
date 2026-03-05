"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import type { Question, TestState, TestResult } from "@/types/question";

const DEFAULT_QUESTIONS_PER_TEST = 10;
const DEFAULT_PASS_PERCENTAGE = 70;
const SEEN_QUESTIONS_KEY = "redtc-seen-questions";

interface TestOptions {
  questionsPerTest?: number;
  passPercentage?: number;
}

export interface QuestionTiming {
  questionId: number;
  timeSpent: number;
  answeredCorrectly: boolean;
}

function getRandomValues(count: number): number[] {
  if (typeof window !== "undefined" && window.crypto) {
    const array = new Uint32Array(count);
    window.crypto.getRandomValues(array);
    return Array.from(array).map(v => v / (0xFFFFFFFF + 1));
  }
  return Array.from({ length: count }, () => Math.random());
}

function shuffleArray<T>(array: T[], passes: number = 3): T[] {
  let shuffled = [...array];
  for (let pass = 0; pass < passes; pass++) {
    const randoms = getRandomValues(shuffled.length);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(randoms[i] * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }
  return shuffled;
}

function getSeenQuestions(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(SEEN_QUESTIONS_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return new Set(data.ids || []);
    }
  } catch {
    // Ignore errors
  }
  return new Set();
}

function saveSeenQuestions(ids: number[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SEEN_QUESTIONS_KEY, JSON.stringify({ 
      ids, 
      lastUpdated: Date.now() 
    }));
  } catch {
    // Ignore errors
  }
}

function selectWeightedRandomQuestions(questions: Question[], count: number): Question[] {
  const seenIds = getSeenQuestions();
  
  const unseen = questions.filter(q => !seenIds.has(q.id));
  const seen = questions.filter(q => seenIds.has(q.id));
  
  let selected: Question[] = [];
  
  if (unseen.length >= count) {
    const shuffledUnseen = shuffleArray(unseen);
    selected = shuffledUnseen.slice(0, count);
  } else if (unseen.length > 0) {
    selected = [...shuffleArray(unseen)];
    const remaining = count - unseen.length;
    const shuffledSeen = shuffleArray(seen);
    selected = [...selected, ...shuffledSeen.slice(0, remaining)];
  } else {
    saveSeenQuestions([]);
    const shuffled = shuffleArray(questions);
    selected = shuffled.slice(0, count);
  }
  
  selected = shuffleArray(selected);
  
  const newSeenIds = [...seenIds, ...selected.map(q => q.id)];
  const uniqueSeenIds = [...new Set(newSeenIds)];
  
  if (uniqueSeenIds.length >= questions.length * 0.9) {
    saveSeenQuestions(selected.map(q => q.id));
  } else {
    saveSeenQuestions(uniqueSeenIds);
  }
  
  return selected;
}

export function useTest(allQuestions: Question[], options: TestOptions = {}) {
  const questionsPerTest = options.questionsPerTest || DEFAULT_QUESTIONS_PER_TEST;
  const passPercentage = options.passPercentage || DEFAULT_PASS_PERCENTAGE;
  
  const [testQuestions, setTestQuestions] = useState<Question[]>(() => 
    selectWeightedRandomQuestions(allQuestions, questionsPerTest)
  );
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
    setTestQuestions(selectWeightedRandomQuestions(allQuestions, questionsPerTest));
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

  const initializeTest = useCallback(() => {
    setTestQuestions(selectWeightedRandomQuestions(allQuestions, questionsPerTest));
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
    initializeTest,
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
