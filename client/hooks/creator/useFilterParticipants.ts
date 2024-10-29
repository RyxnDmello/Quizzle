import { useState } from "react";

import Participant from "@interfaces/Participant";

export default function useFilterParticipants(participants: Participant[]) {
  const [prompt, setPrompt] = useState<string>("");

  const handleSetPrompt = (prompt: string) => setPrompt(prompt);

  const filter: Participant[] = participants.filter((participant) =>
    participant.participantName.toLowerCase().includes(prompt.toLowerCase())
  );

  return { filter, handleSetPrompt };
}
