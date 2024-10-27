import { useState, useEffect } from "react";

import { Quiz } from "@interfaces/Quiz";

const data: Quiz[] = [
  {
    id: "QID1A2B",
    title: "Next.js",
    points: 20,
    questions: 10,
    difficulty: "HARD",
  },
  {
    id: "QID3C4D",
    title: "React",
    points: 15,
    questions: 8,
    difficulty: "MEDIUM",
  },
  {
    id: "QID5E6F",
    title: "Node.js",
    points: 25,
    questions: 12,
    difficulty: "HARD",
  },
  {
    id: "QID7G8H",
    title: "Express",
    points: 18,
    questions: 9,
    difficulty: "EASY",
  },
  {
    id: "QID9I0J",
    title: "MongoDB",
    points: 20,
    questions: 10,
    difficulty: "HARD",
  },
  {
    id: "QID1K2L",
    title: "Firebase",
    points: 15,
    questions: 7,
    difficulty: "MEDIUM",
  },
  {
    id: "QID3M4N",
    title: "Flutter",
    points: 22,
    questions: 11,
    difficulty: "EASY",
  },
  {
    id: "QID5O6P",
    title: "Django",
    points: 19,
    questions: 9,
    difficulty: "MEDIUM",
  },
  {
    id: "QID7Q8R",
    title: "Mongoose",
    points: 20,
    questions: 10,
    difficulty: "HARD",
  },
  {
    id: "QID9S0T",
    title: "Vite",
    points: 14,
    questions: 6,
    difficulty: "EASY",
  },
  {
    id: "QID1U2V",
    title: "Redux",
    points: 23,
    questions: 12,
    difficulty: "MEDIUM",
  },
  {
    id: "QID3W4X",
    title: "GraphQL",
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
