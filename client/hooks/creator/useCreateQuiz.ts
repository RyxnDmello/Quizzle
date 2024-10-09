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

  const handleDeleteQuestion = (index: number) => {
    setQuiz((prev) => {
      return {
        ...prev,
        questions: values.questions.filter((_, i) => i !== index),
      };
    });
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
    handleDeleteQuestion,
  };
}
