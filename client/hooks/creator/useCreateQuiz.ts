import { useState } from "react";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
        selected: null,
        points: 0,
      },
    ],
  });

  const onSubmit = async (values: QuizSchema) => {
    try {
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

      replace(`/${user!.type!.toLowerCase()}`, { scroll: true });
    } catch (error) {
      console.log(error instanceof AxiosError && error.response?.data);
    }
  };

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
            selected: null,
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
    onSubmit: onSubmit,
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
