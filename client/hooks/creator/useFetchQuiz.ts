import { useEffect, useState } from "react";

import QuizSchema from "@schemas/QuizSchema";

export default function useFetchQuiz() {
  const [quiz, setQuiz] = useState<QuizSchema>({
    id: undefined,
    title: "",
    difficulty: "NULL",
    questions: [],
  });

  const fetchQuiz = () => {
    setTimeout(() => {
      setQuiz({
        id: "QID24680",
        title: "Next.js",
        difficulty: "MEDIUM",
        questions: [
          {
            question: "What is Next.js",
            options: {
              A: "They manage state.",
              B: "Cached in the server.",
              C: "All of the above.",
            },
            correct: "A",
            selected: "A",
            points: 20,
          },
          {
            question: "What are Server Components",
            options: {
              A: "They manage state.",
              B: "Cached in the server.",
              C: "All of the above.",
            },
            correct: "B",
            selected: "C",
            points: 20,
          },
          {
            question: "What are Server Components",
            options: {
              A: "They manage state.",
              B: "Cached in the server.",
              C: "All of the above.",
            },
            correct: "C",
            selected: "B",
            points: 20,
          },
        ],
      });
    }, 1500);
  };

  const questions = quiz.questions.filter(
    (quiz) => quiz.correct === quiz.selected
  );

  const points =
    questions.length === 0
      ? 0
      : questions.reduce((prev, current) => {
          return { ...current, points: prev.points + current.points };
        });

  const correct = questions.length;

  useEffect(() => {
    fetchQuiz();
  }, [quiz]);

  return { quiz, points, correct };
}
