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
      whileHover={!disabled ? { scale: 1.005 } : {}}
      whileTap={!disabled ? { scale: 0.995 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full text-left transition-all duration-200 group",
        "border p-4 md:p-5",
        "flex items-start gap-4",
        disabled && "cursor-default",
        !showResult && !disabled && "hover:bg-muted/50",
        !showResult && isSelected && "bg-foreground text-background border-foreground",
        isCorrectAnswer && "bg-foreground text-background border-foreground",
        isWrongSelection && "bg-muted border-muted-foreground/50"
      )}
    >
      {/* Option Letter */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-bold border",
          !showResult && !isSelected && "border-border",
          !showResult && isSelected && "border-background/30",
          isCorrectAnswer && "border-background/30",
          isWrongSelection && "border-muted-foreground/30"
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
      <span className="flex-1 pt-1 text-sm md:text-base leading-relaxed">
        {option.text}
      </span>

      {/* Result Badge */}
      {showResult && (isCorrect || isWrongSelection) && (
        <span
          className={cn(
            "flex-shrink-0 text-xs font-bold uppercase tracking-wider pt-1",
            isCorrect && "opacity-70",
            isWrongSelection && "text-muted-foreground"
          )}
        >
          {isCorrect ? "Correct" : "Incorrect"}
        </span>
      )}
    </motion.button>
  );
}
