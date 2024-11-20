import { DIFFICULTY } from "./Quiz";

export default interface AnsweredQuiz {
  quizID: string;
  attendeeID: string;
  quizTitle: string;
  quizDifficulty: DIFFICULTY;
  participantName: string;
  totalPoints: number;
  finalPoints: number;
  completionDate: string;
  questions: Question[];
}

export interface Question {
  question: string;
  correct: string;
  selected: string;
  points: number;
}
