"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { Question, TestState, TestResult } from "@/types/question";

const QUESTIONS_PER_TEST = 10;
const PASS_PERCENTAGE = 70;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useTest(allQuestions: Question[]) {
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [state, setState] = useState<TestState>({
    currentQuestionIndex: 0,
    answers: {},
    showExplanation: false,
    isComplete: false,
  });

  useEffect(() => {
    const shuffled = shuffleArray(allQuestions);
    setTestQuestions(shuffled.slice(0, QUESTIONS_PER_TEST));
  }, [allQuestions]);

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
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        showExplanation: !!prev.answers[testQuestions[prev.currentQuestionIndex + 1]?.id],
      }));
    } else {
      setState((prev) => ({
        ...prev,
        isComplete: true,
      }));
    }
  }, [state.currentQuestionIndex, testQuestions]);

  const previousQuestion = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
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
    setTestQuestions(shuffled.slice(0, QUESTIONS_PER_TEST));
    setState({
      currentQuestionIndex: 0,
      answers: {},
      showExplanation: false,
      isComplete: false,
    });
  }, [allQuestions]);

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
      passed: percentage >= PASS_PERCENTAGE,
      passPercentage: PASS_PERCENTAGE,
    };
  }, [testQuestions, state.answers]);

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
    questionsPerTest: QUESTIONS_PER_TEST,
    passPercentage: PASS_PERCENTAGE,
  };
}
