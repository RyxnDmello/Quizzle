import { useState } from "react";

import { Quiz } from "@interfaces/Quiz";

export default function useFilterQuizzes(quizzes: Quiz[]) {
  const [prompt, setPrompt] = useState<string>("");

  const handleSetPrompt = (prompt: string) => setPrompt(prompt);

  const filter: Quiz[] = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(prompt.toLowerCase())
  );

  return { filter, handleSetPrompt };
}
