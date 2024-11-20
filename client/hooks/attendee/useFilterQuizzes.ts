import { useState } from "react";

import AnsweredQuiz from "@interfaces/Answer";

export default function useFilterQuizzes(quizzes: AnsweredQuiz[]) {
  const [prompt, setPrompt] = useState<string>("");

  const handleSetPrompt = (prompt: string) => setPrompt(prompt);

  const filter: AnsweredQuiz[] = quizzes.filter((quiz) =>
    quiz.quizTitle.toLowerCase().includes(prompt.toLowerCase())
  );

  return { filter, handleSetPrompt };
}
