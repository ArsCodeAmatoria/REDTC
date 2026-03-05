import type { Difficulty } from "@/types/question";

const EASY_CATEGORIES = [
  "Safety & Legislation",
  "Communication & Site Conditions",
  "Communication & Supervision",
  "Site Operations & Planning",
  "Inspection & Maintenance",
];

const MEDIUM_CATEGORIES = [
  "Rigging & Slinging",
  "Rigging Practices",
  "Crane Components & Operation",
  "Regulations, Standards & Responsibilities",
  "Electrical & Safety Systems",
  "Operational Hazards",
  "Environmental & Site Hazards",
  "Climbing & Erection",
  "Hoisting & Mechanical Systems",
  "Structural & Mechanical Systems",
];

const HARD_CATEGORIES = [
  "Load Charts & Calculations",
  "Load Calculations & Theory",
  "Advanced Load Charts & Math",
  "Advanced Load Theory",
  "Rigging Calculations & Angles",
  "Advanced Rigging & Load Control",
  "Structural & Stability Principles",
  "Advanced Failure Scenarios",
  "Troubleshooting & Failure Prevention",
  "Emergency & Abnormal Situations",
  "Master - Advanced Load Calculations",
  "Master - Emergency Response",
  "Master - Structural Engineering",
  "Master - Rigging",
  "Master - Mechanical Systems",
  "Master - Environmental Risk",
];

export function getDifficultyForCategory(category?: string): Difficulty {
  if (!category) return "medium";
  
  if (EASY_CATEGORIES.includes(category)) return "easy";
  if (HARD_CATEGORIES.includes(category)) return "hard";
  if (MEDIUM_CATEGORIES.includes(category)) return "medium";
  
  // Default to hard for any Master category not explicitly listed
  if (category.startsWith("Master")) return "hard";
  
  return "medium";
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case "easy": return "Easy";
    case "medium": return "Medium";
    case "hard": return "Hard";
  }
}

export function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case "easy": return "text-green-500";
    case "medium": return "text-yellow-500";
    case "hard": return "text-red-500";
  }
}

export function getDifficultyBgColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case "easy": return "bg-green-500/10 border-green-500/30";
    case "medium": return "bg-yellow-500/10 border-yellow-500/30";
    case "hard": return "bg-red-500/10 border-red-500/30";
  }
}
