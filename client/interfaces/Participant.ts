export default interface Participant {
  quizID: string;
  attendeeID: string;
  quizTitle: string;
  quizDifficulty: string;
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
