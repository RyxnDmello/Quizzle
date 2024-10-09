import { useState } from "react";

interface Participant {
  id: string;
  name: string;
  points: number;
  correct: number;
  questions: number;
  date: string;
}

export default function useFilterParticipants(participants: Participant[]) {
  const [prompt, setPrompt] = useState<string>("");

  const handleSetPrompt = (prompt: string) => setPrompt(prompt);

  const filter: Participant[] = participants.filter((participant) =>
    participant.name.toLowerCase().includes(prompt.toLowerCase())
  );

  return { filter, handleSetPrompt };
}
