import { useState } from "react";

import AnsweredQuiz from "@interfaces/Answer";

export default function useFilterAnsweredQuizzes(participants: AnsweredQuiz[]) {
  const [prompt, setPrompt] = useState<string>("");

  const handleSetPrompt = (prompt: string) => setPrompt(prompt);

  const filter: AnsweredQuiz[] = participants.filter((participant) =>
    participant.participantName.toLowerCase().includes(prompt.toLowerCase())
  );

  return { filter, handleSetPrompt };
}
