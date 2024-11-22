import { useState } from "react";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import Quiz from "@interfaces/Quiz";

import useAuth from "@hooks/authentication/useAuth";

import QuizSchema, { validationSchema } from "@schemas/QuizSchema";

export default function useEditQuiz() {
  const { user } = useAuth();
  const { replace } = useRouter();
  const { id } = useParams<{ id: string }>();

  const [updatedQuiz, setUpdatedQuiz] = useState<QuizSchema | undefined>(
    undefined
  );

  const handleAddQuestion = () => {
    setUpdatedQuiz((prev) => {
      if (!prev) return prev;

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
            selected: null,
          },
        ],
      };
    });
  };

  const handleDeleteQuestion = (index: number) => {
    setUpdatedQuiz((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        questions: formValues.questions.filter((_, i) => i !== index),
      };
    });
  };

  const handleFetchQuiz = async () => {
    const { data } = await axios.get<Quiz>(`/api/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${user!.accessToken}`,
      },
    });

    setUpdatedQuiz(data);
    return data;
  };

  const handleUpdateQuiz = async () => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/quiz/${id}`,
      formValues,
      {
        headers: {
          Authorization: `Bearer ${user!.accessToken}`,
        },
      }
    );

    replace("/creator", { scroll: true });
  };

  const { error: fetchError, isPending: isFetchPending } = useQuery<
    Quiz,
    AxiosError<{ error: string }>,
    Quiz
  >({
    queryKey: ["quiz", id],
    queryFn: handleFetchQuiz,
  });

  const {
    error: updateError,
    isPending: isUpdatePending,
    mutate: onSubmit,
  } = useMutation<void, AxiosError<{ error: string }>, void>({
    mutationKey: ["quiz", id],
    mutationFn: handleUpdateQuiz,
  });

  const {
    values: formValues,
    errors: formErrors,
    touched: formTouched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik<QuizSchema>({
    initialValues: {
      title: updatedQuiz ? updatedQuiz.title : "",
      difficulty: updatedQuiz ? updatedQuiz.difficulty : "NULL",
      questions: updatedQuiz ? updatedQuiz.questions : [],
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: () => onSubmit(),
  });

  return {
    updatedQuiz,
    fetchError,
    updateError,
    formErrors,
    formValues,
    formTouched,
    isFetchPending,
    isUpdatePending,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleAddQuestion,
    handleDeleteQuestion,
  };
}
