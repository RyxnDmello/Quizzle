import { useState, useEffect } from "react";

import { Quiz } from "@interfaces/Quiz";

const data: Quiz[] = [
  {
    id: "QID1A2B",
    name: "Next.js",
    points: 20,
    questions: 10,
    difficulty: "HARD",
  },
  {
    id: "QID3C4D",
    name: "React",
    points: 15,
    questions: 8,
    difficulty: "MEDIUM",
  },
  {
    id: "QID5E6F",
    name: "Node.js",
    points: 25,
    questions: 12,
    difficulty: "HARD",
  },
  {
    id: "QID7G8H",
    name: "Express",
    points: 18,
    questions: 9,
    difficulty: "EASY",
  },
  {
    id: "QID9I0J",
    name: "MongoDB",
    points: 20,
    questions: 10,
    difficulty: "HARD",
  },
  {
    id: "QID1K2L",
    name: "Firebase",
    points: 15,
    questions: 7,
    difficulty: "MEDIUM",
  },
  {
    id: "QID3M4N",
    name: "Flutter",
    points: 22,
    questions: 11,
    difficulty: "EASY",
  },
  {
    id: "QID5O6P",
    name: "Django",
    points: 19,
    questions: 9,
    difficulty: "MEDIUM",
  },
  {
    id: "QID7Q8R",
    name: "Mongoose",
    points: 20,
    questions: 10,
    difficulty: "HARD",
  },
  {
    id: "QID9S0T",
    name: "Vite",
    points: 14,
    questions: 6,
    difficulty: "EASY",
  },
  {
    id: "QID1U2V",
    name: "Redux",
    points: 23,
    questions: 12,
    difficulty: "MEDIUM",
  },
  {
    id: "QID3W4X",
    name: "GraphQL",
    points: 21,
    questions: 10,
    difficulty: "HARD",
  },
];

export default function useFetchQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const fetchQuizzes = async () => {
    setTimeout(() => setQuizzes(data), 2000);
  };

  useEffect(() => {
    fetchQuizzes();
  }, [quizzes]);

  return { quizzes };
}
