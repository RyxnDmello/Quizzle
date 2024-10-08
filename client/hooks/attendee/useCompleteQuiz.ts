import { useEffect, useState } from "react";
import { useFormik } from "formik";

import QuizSchema, { validationSchema } from "@schemas/QuizSchema";

export default function useCompleteQuiz() {
  const [quiz, setQuiz] = useState<QuizSchema>({
    id: undefined,
    title: "",
    difficulty: "NULL",
    questions: [],
  });

  const onSubmit = () => {
    console.log(values);
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
            points: 20,
          },
        ],
      });
    }, 1500);
  };

  const {
    values,
    errors,
    touched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: quiz,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validate: () => {
      console.log(errors);
    },
    onSubmit: onSubmit,
  });

  useEffect(() => {
    fetchQuiz();
  }, [quiz]);

  return {
    quiz,
    errors,
    values,
    touched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  };
}
