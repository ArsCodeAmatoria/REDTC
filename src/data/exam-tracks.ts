import type { ExamId, Question } from "@/types/question";

export type { ExamId };

export const EXAM_LABELS: Record<ExamId, string> = {
  b: "Level B Provisional",
  l1: "Level 1 SLE",
  l2: "Level 2 SLE",
  ip: "Red Seal IP",
  lcr: "Load Chart & Rigging",
};

export const EXAM_SHORT: Record<ExamId, string> = {
  b: "Level B",
  l1: "Level 1",
  l2: "Level 2",
  ip: "Red Seal IP",
  lcr: "LCR Practical",
};

export const FULFORD_B_SECTIONS: { id: number; name: string; points: number }[] = [
  { id: 1, name: "General crane regulations", points: 3 },
  { id: 2, name: "Awareness of energized systems", points: 3 },
  { id: 3, name: "Hand signals & radio communication", points: 3 },
  { id: 4, name: "Crane gross & net capacity", points: 2 },
  { id: 5, name: "Pre-operation inspection & operation", points: 3 },
  { id: 6, name: "Cranes lifting suspended work platforms", points: 2 },
  { id: 7, name: "Identify rigging slings & hardware", points: 2 },
  { id: 8, name: "Pre-use inspection of rigging slings & hardware", points: 3 },
  { id: 9, name: "Rigging hitches", points: 2 },
  { id: 10, name: "Sling capacity charts & tension calculations", points: 6 },
  { id: 11, name: "Determine load weight", points: 4 },
  { id: 12, name: "Estimate load centre of gravity", points: 2 },
  { id: 13, name: "Use of tag lines", points: 1 },
  { id: 14, name: "Ordinary lift planning", points: 2 },
  { id: 15, name: "Critical lift planning", points: 2 },
];

export type ExamTrack = {
  id: ExamId | "practice";
  title: string;
  subtitle: string;
  questions: number;
  minutes: number | null;
  passPercent: number;
  body: string;
};

export const EXAM_TRACKS: ExamTrack[] = [
  {
    id: "practice",
    title: "Quick Practice",
    subtitle: "Mixed bank",
    questions: 10,
    minutes: null,
    passPercent: 70,
    body: "10 random questions from the full tower-crane bank.",
  },
  {
    id: "b",
    title: "Level B Provisional",
    subtitle: "Fulford Core Theory",
    questions: 40,
    minutes: 90,
    passPercent: 70,
    body: "40 questions / 28 to pass. Same 15 sections as the BC Crane Safety Core Theory exam (Aug 2025): regulations, energized systems, signals, gross/net, inspection, work platforms, rigging, weights, COG, tag lines, ordinary and critical lift planning.",
  },
  {
    id: "l1",
    title: "Level 1 SLE",
    subtitle: "SkilledTradesBC",
    questions: 50,
    minutes: null,
    passPercent: 70,
    body: "Tower Crane Operator (2024) Level 1: Lines A–H and J1 — regulations, crane types, systems, basic rigging, hoisting calculations, inspection, ordinary lift planning, operations. 70% pass. Code book not required.",
  },
  {
    id: "l2",
    title: "Level 2 SLE",
    subtitle: "SkilledTradesBC",
    questions: 50,
    minutes: null,
    passPercent: 70,
    body: "Level 2: communications, advanced rigging and load weights, complete inspection, engineered/critical lifts, climbing and reconfiguration, self-erect assembly, specialty operations (platforms, engineered and multiple-crane lifts).",
  },
  {
    id: "ip",
    title: "Red Seal IP",
    subtitle: "100 questions · 2023 RSOS",
    questions: 100,
    minutes: 240,
    passPercent: 70,
    body: "100 multiple-choice questions · 4 hours · 70/100 to pass. Weighted to the 2023 RSOS: A 11 · B 21 · C 23 · D 17 · E 28. Closed book; formulas and acronyms are provided. In B.C. you sit this through SkilledTradesBC after Level 1 SLE.",
  },
  {
    id: "lcr",
    title: "Load Chart & Rigging",
    subtitle: "Fulford practical Part 1",
    questions: 10,
    minutes: 45,
    passPercent: 70,
    body: "8 load-chart + 2 rigging. Never interpolate. 7/10 to pass. Uses this site’s manufacturer PDFs (same skill as Fulford’s LCR exam).",
  },
];

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function questionsForExam(all: Question[], exam: ExamId): Question[] {
  const tagged = all.filter((q) => q.exams?.includes(exam));
  return tagged.length >= 8 ? tagged : all;
}

/** Pick a Level B–style paper matching Fulford’s 15-section point counts. */
export function selectLevelBPaper(all: Question[]): Question[] {
  const pool = questionsForExam(all, "b");
  const picked: Question[] = [];
  const used = new Set<number>();

  for (const section of FULFORD_B_SECTIONS) {
    const candidates = shuffle(
      pool.filter((q) => q.bSection === section.id && !used.has(q.id))
    );
    let n = 0;
    for (const q of candidates) {
      if (n >= section.points) break;
      picked.push(q);
      used.add(q.id);
      n++;
    }
    if (n < section.points) {
      const fill = shuffle(pool.filter((q) => !used.has(q.id)));
      for (const q of fill) {
        if (n >= section.points) break;
        picked.push(q);
        used.add(q.id);
        n++;
      }
    }
  }

  if (picked.length < 40) {
    for (const q of shuffle(pool)) {
      if (picked.length >= 40) break;
      if (!used.has(q.id)) {
        picked.push(q);
        used.add(q.id);
      }
    }
  }

  return shuffle(picked).slice(0, 40);
}

/** 2023 Red Seal Occupational Standard — official IP exam breakdown (100 questions). */
export const RSOS_MWA: { letter: "A" | "B" | "C" | "D" | "E"; name: string; count: number }[] = [
  { letter: "A", name: "Performs common occupational skills", count: 11 },
  { letter: "B", name: "Inspects and maintains crane", count: 21 },
  { letter: "C", name: "Crane set-up, hoisting calculations and lift planning", count: 23 },
  { letter: "D", name: "Performs rigging", count: 17 },
  { letter: "E", name: "Operates crane", count: 28 },
];

export const RSOS_TASKS: { id: string; mwa: "A" | "B" | "C" | "D" | "E"; name: string; count: number }[] = [
  { id: "A-1", mwa: "A", name: "Performs safety-related functions", count: 8 },
  { id: "A-2", mwa: "A", name: "Uses communication and mentoring techniques", count: 3 },
  { id: "B-3", mwa: "B", name: "Performs pre-operational checks and regular inspections", count: 10 },
  { id: "B-4", mwa: "B", name: "Performs continual checks", count: 6 },
  { id: "B-5", mwa: "B", name: "Performs minor crane maintenance", count: 5 },
  { id: "C-6", mwa: "C", name: "Participates in assembly, disassembly and transportation", count: 6 },
  { id: "C-7", mwa: "C", name: "Participates in climbing and reconfigurations", count: 8 },
  { id: "C-8", mwa: "C", name: "Plans lifts", count: 9 },
  { id: "D-9", mwa: "D", name: "Inspects, maintains and stores rigging equipment", count: 8 },
  { id: "D-10", mwa: "D", name: "Follows rigging procedures", count: 9 },
  { id: "E-11", mwa: "E", name: "Performs pre-lift (warm-up) activities", count: 6 },
  { id: "E-12", mwa: "E", name: "Operates tower cranes", count: 10 },
  { id: "E-13", mwa: "E", name: "Performs specialty tower crane operations", count: 6 },
  { id: "E-14", mwa: "E", name: "Shuts down and secures tower cranes", count: 6 },
];

const TASK_FALLBACK: Record<string, (q: Question) => boolean> = {
  "B-3": (q) =>
    q.bSection === 5 ||
    /pre-op|pre-use|pre-operational|logbook|each shift/i.test(q.question),
  "B-4": (q) =>
    /continual|limit switch|limit device|overload|lmi|during operation/i.test(q.question),
  "B-5": (q) => /lubricat|grease|maintenance|preventive/i.test(q.question),
  "C-7": (q) =>
    /climb|climbing|tie-in|tie in|reconfigur|climbing frame/i.test(q.question),
  "E-11": (q) => /warm-?up|pre-lift|before lifting/i.test(q.question),
  "E-14": (q) =>
    /unattended|shut down|weathervane|weather.?vane|free slew|leaving the crane|out of service/i.test(
      q.question
    ),
};

/** First official task id on a question (D-11 tag-line items count as D-10). */
export function parseRsosTask(q: Question): string | null {
  const raw = q.rsos || "";
  const match = raw.match(/[A-E]-\d+/);
  if (!match) return null;
  if (match[0] === "D-11") return "D-10";
  return match[0];
}

function takeFrom(
  candidates: Question[],
  count: number,
  used: Set<number>
): Question[] {
  const out: Question[] = [];
  for (const q of shuffle(candidates)) {
    if (out.length >= count) break;
    if (used.has(q.id)) continue;
    out.push(q);
    used.add(q.id);
  }
  return out;
}

/** Pick a 100-question paper matching the official 2023 RSOS task counts. */
export function selectIpPaper(all: Question[]): Question[] {
  const pool = questionsForExam(all, "ip");
  const used = new Set<number>();
  const picked: Question[] = [];
  const maxCharts = 4;
  let chartsTaken = 0;

  for (const task of RSOS_TASKS) {
    const exact = pool.filter((q) => parseRsosTask(q) === task.id && !used.has(q.id));
    let batch: Question[] = [];

    if (task.id === "C-8") {
      const theory = exact.filter((q) => !q.chartPdf);
      const charts = exact.filter((q) => q.chartPdf);
      const chartSlots = Math.min(3, maxCharts - chartsTaken, task.count);
      const chartPick = takeFrom(charts, chartSlots, used);
      chartsTaken += chartPick.filter((q) => q.chartPdf).length;
      const theoryPick = takeFrom(theory, task.count - chartPick.length, used);
      batch = [...chartPick, ...theoryPick];
    } else if (task.id === "C-7") {
      const climbing = pool.filter(
        (q) => !used.has(q.id) && TASK_FALLBACK["C-7"](q)
      );
      batch = takeFrom(climbing, task.count, used);
      if (batch.length < task.count) {
        batch.push(...takeFrom(exact, task.count - batch.length, used));
      }
    } else {
      batch = takeFrom(exact, task.count, used);
    }

    if (batch.length < task.count) {
      const fb = TASK_FALLBACK[task.id];
      if (fb) {
        batch.push(
          ...takeFrom(
            pool.filter((q) => !used.has(q.id) && fb(q)),
            task.count - batch.length,
            used
          )
        );
      }
    }

    if (batch.length < task.count) {
      batch.push(
        ...takeFrom(
          pool.filter(
            (q) =>
              !used.has(q.id) &&
              (parseRsosTask(q)?.startsWith(task.mwa + "-") ||
                q.rsos?.startsWith(task.mwa + "-"))
          ),
          task.count - batch.length,
          used
        )
      );
    }

    picked.push(...batch);
  }

  if (picked.length < 100) {
    picked.push(...takeFrom(pool, 100 - picked.length, used));
  }

  return shuffle(picked).slice(0, 100);
}

export function scoreByMwa(
  questions: Question[],
  answers: Record<number, { isCorrect: boolean }>
): { letter: string; name: string; count: number; correct: number }[] {
  return RSOS_MWA.map((block) => {
    const inBlock = questions.filter((q) => parseRsosTask(q)?.startsWith(block.letter));
    const correct = inBlock.filter((q) => answers[q.id]?.isCorrect).length;
    return {
      letter: block.letter,
      name: block.name,
      count: inBlock.length,
      correct,
    };
  });
}

export function selectTrackQuestions(all: Question[], trackId: ExamTrack["id"]): Question[] {
  if (trackId === "practice") {
    return shuffle(all).slice(0, 10);
  }
  if (trackId === "b") return selectLevelBPaper(all);
  if (trackId === "ip") return selectIpPaper(all);
  if (trackId === "lcr") {
    const charts = shuffle(all.filter((q) => q.chartPdf)).slice(0, 8);
    const rigging = shuffle(
      all.filter(
        (q) =>
          !q.chartPdf &&
          (q.bSection === 7 ||
            q.bSection === 8 ||
            q.bSection === 9 ||
            q.bSection === 10 ||
            (q.exams?.includes("lcr") && /sling|hitch|rigging|wll/i.test(q.question)))
      )
    ).slice(0, 2);
    const fill = shuffle(all.filter((q) => q.chartPdf && !charts.includes(q)));
    const picked = [...charts];
    while (picked.length < 8 && fill.length) picked.push(fill.pop()!);
    picked.push(...rigging);
    return shuffle(picked).slice(0, 10);
  }
  const exam = trackId as ExamId;
  return shuffle(questionsForExam(all, exam)).slice(0, 50);
}

export function examBadgeClass(exam: ExamId): string {
  switch (exam) {
    case "b":
      return "border-accent/40 text-accent";
    case "l1":
      return "border-border text-foreground";
    case "l2":
      return "border-border text-foreground";
    case "ip":
      return "border-foreground/40 text-foreground";
    case "lcr":
      return "border-accent/40 text-accent";
  }
}
