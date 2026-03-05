"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/question";

interface AnswerOptionProps {
  option: Question["options"][0];
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  showResult: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const optionLetters = ["A", "B", "C", "D"];

export function AnswerOption({
  option,
  index,
  isSelected,
  isCorrect,
  showResult,
  onClick,
  disabled = false,
}: AnswerOptionProps) {
  const isWrongSelection = showResult && isSelected && !isCorrect;
  const isCorrectAnswer = showResult && isCorrect;

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full text-left transition-all duration-200 group",
        "border p-4 min-h-[56px]",
        "flex items-start gap-3 sm:gap-4",
        disabled && "cursor-default",
        !showResult && !disabled && "hover:border-foreground hover:bg-muted/30 active:bg-muted/50",
        !showResult && isSelected && "bg-foreground text-background border-foreground",
        isCorrectAnswer && "bg-accent text-accent-foreground border-accent",
        isWrongSelection && "bg-muted border-muted-foreground/50"
      )}
    >
      {/* Option Letter */}
      <div
        className={cn(
          "flex-shrink-0 w-7 h-7 flex items-center justify-center text-xs font-bold",
          !showResult && !isSelected && "bg-muted",
          !showResult && isSelected && "bg-background/20",
          isCorrectAnswer && "bg-accent-foreground/20",
          isWrongSelection && "bg-muted-foreground/20"
        )}
      >
        {showResult ? (
          isCorrect ? (
            <Check className="w-4 h-4" />
          ) : isSelected ? (
            <X className="w-4 h-4" />
          ) : (
            optionLetters[index]
          )
        ) : (
          optionLetters[index]
        )}
      </div>

      {/* Option Text */}
      <span className="flex-1 text-sm leading-relaxed pt-0.5">
        {option.text}
      </span>

      {/* Result Badge */}
      {showResult && (isCorrect || isWrongSelection) && (
        <span
          className={cn(
            "flex-shrink-0 text-xs font-bold uppercase tracking-wider pt-0.5",
            isCorrect && "opacity-80",
            isWrongSelection && "text-muted-foreground"
          )}
        >
          {isCorrect ? "Correct" : "Wrong"}
        </span>
      )}
    </motion.button>
  );
}
