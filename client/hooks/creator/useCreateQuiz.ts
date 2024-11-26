import { useState } from "react";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import useAuth from "@hooks/authentication/useAuth";

import QuizSchema, { validationSchema } from "@schemas/QuizSchema";

export default function useCreateQuiz() {
  const { user } = useAuth();
  const { replace } = useRouter();

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
            points: 0,
            question: "",
            options: {
              A: "",
              B: "",
              C: "",
            },
            correct: null,
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

  const handleCreateQuiz = async () => {
    await axios.post<QuizSchema>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/quiz`,
      {
        ...values,
        creatorID: user!.id,
      },
      {
        headers: {
          Authorization: `Bearer ${user!.accessToken}`,
        },
      }
    );

    replace(`/creator`, { scroll: true });
  };

  const {
    error: createError,
    isPending: isCreatePending,
    mutate: onSubmit,
  } = useMutation<unknown, AxiosError<{ error: string }>, void>({
    mutationKey: ["quiz", "create"],
    mutationFn: handleCreateQuiz,
  });

  const {
    values,
    errors: formErrors,
    touched: formTouched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: quiz,
    validationSchema: validationSchema,
    onSubmit: () => onSubmit(),
  });

  return {
    quiz,
    formErrors,
    createError,
    formTouched,
    isCreatePending,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleAddQuestion,
    handleDeleteQuestion,
  };
}
