import { useState, useEffect } from "react";

interface Participant {
  id: string;
  name: string;
  points: number;
  correct: number;
  questions: number;
  date: string;
}

export default function useFetchParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const fetchParticipants = () => {
    setTimeout(() => {
      setParticipants([
        {
          id: "AID24680",
          name: "Ryan Nolasco D Mello",
          points: 50,
          correct: 5,
          questions: 10,
          date: "10/10/2024",
        },
        {
          id: "AID13579",
          name: "Rhea Saldanha",
          points: 10,
          correct: 5,
          questions: 10,
          date: "10/10/2024",
        },
        {
          id: "AID52706",
          name: "Harsh Jain",
          points: 60,
          correct: 6,
          questions: 10,
          date: "10/10/2024",
        },
        {
          id: "AID123123",
          name: "Jerson Braganza",
          points: 50,
          correct: 5,
          questions: 10,
          date: "10/10/2024",
        },
        {
          id: "AID312312",
          name: "Nathan Sequeria",
          points: 10,
          correct: 5,
          questions: 10,
          date: "10/10/2024",
        },
        {
          id: "AID67478",
          name: "Ethan Hunt",
          points: 60,
          correct: 6,
          questions: 10,
          date: "10/10/2024",
        },
      ]);
    }, 1500);
  };

  useEffect(() => {
    fetchParticipants();
  }, [participants]);

  return { participants };
}
