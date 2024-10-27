export type DIFFICULTY = "HARD" | "MEDIUM" | "EASY";
export type OPTIONS = "A" | "B" | "C";

export default interface Quiz {
  id?: string;
  title: string;
  points: number;
  difficulty: DIFFICULTY;
  questions: Question[];
}

interface Question {
  points: number;
  question: string;
  options: Options;
  correct: OPTIONS;
}

interface Options {
  A: string;
  B: string;
  C: string;
}
