export type DIFFICULTY = "HARD" | "MEDIUM" | "EASY";

export interface Quiz {
  id?: string;
  name: string;
  points: number;
  questions: number;
  difficulty: DIFFICULTY;
}
