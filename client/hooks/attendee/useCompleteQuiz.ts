import { useEffect, useState } from "react";
import { useFormik } from "formik";

import QuizSchema from "@schemas/QuizSchema";
import AnswerSchema, { validationSchema } from "@schemas/AnswerSchema";

export default function useCompleteQuiz() {
  const [quiz, setQuiz] = useState<QuizSchema>({
    id: undefined,
    title: "",
    difficulty: "NULL",
    questions: [],
  });

  const onSubmit = () => {
    quiz.questions = [
      ...quiz.questions.map((question, i) => {
        return {
          ...question,
          selected: values.questions[i].selected,
        };
      }),
    ];

    console.log(quiz);
  };

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
            correct: null,
            selected: null,
            points: 20,
          },
          {
            question: "What are Server Components",
            options: {
              A: "They manage state.",
              B: "Cached in the server.",
              C: "All of the above.",
            },
            correct: null,
            selected: null,
            points: 20,
          },
        ],
      });
    }, 1500);
  };

  const initialValues: AnswerSchema = {
    questions: [
      ...Array.from({ length: quiz.questions.length }, () => {
        return {
          selected: null,
        };
      }),
    ],
  };

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    fetchQuiz();
  }, [quiz]);

  return { quiz, errors, handleSubmit, setFieldValue };
}
