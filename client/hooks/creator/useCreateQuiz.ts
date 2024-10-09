import { useState } from "react";
import { useFormik } from "formik";

import QuizSchema, { validationSchema } from "@schemas/QuizSchema";

export default function useCreateQuiz() {
  const [quiz, setQuiz] = useState<QuizSchema>({
    title: "",
    difficulty: "NULL",
    questions: [
      {
        question: "",
        options: {
          A: "",
          B: "",
          C: "",
        },
        correct: null,
        selected: null,
        points: 0,
      },
    ],
  });

  const handleAddQuestion = () => {
    setQuiz((prev) => {
      return {
        ...prev,
        questions: [
          ...prev.questions,
          {
            question: "",
            options: {
              A: "",
              B: "",
              C: "",
            },
            correct: null,
            selected: null,
            points: 0,
          },
        ],
      };
    });
  };

  const initialValues: QuizSchema = {
    title: "",
    difficulty: "NULL",
    questions: [
      {
        question: "",
        options: {
          A: "",
          B: "",
          C: "",
        },
        correct: null,
        selected: null,
        points: 0,
      },
    ],
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
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      console.log(values);
    },
  });

  return {
    quiz,
    errors,
    touched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleAddQuestion,
  };
}
