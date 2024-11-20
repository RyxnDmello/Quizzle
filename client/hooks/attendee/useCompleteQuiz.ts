import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";

import useAuth from "@hooks/authentication/useAuth";

import QuizSchema from "@schemas/QuizSchema";
import AnswerSchema, { validationSchema } from "@schemas/AnswerSchema";

export default function useCompleteQuiz() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const { replace } = useRouter();

  const fetchAnsweredQuiz = async () => {
    const { data } = await axios.get<QuizSchema>(`/api/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${user!.accessToken}`,
      },
    });

    return data;
  };

  const {
    data: quiz,
    error,
    isPending,
  } = useQuery({
    queryKey: ["attendee", id],
    queryFn: fetchAnsweredQuiz,
  });

  const onSubmit = () => {
    try {
      axios.post(
        `/api/quiz/${id}/answer`,
        {
          attendeeID: user!.id,
          name: user!.name,
          questions: values.questions.map((q) => {
            return {
              selected: q.selected,
            };
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${user!.accessToken}`,
          },
        }
      );

      replace("/attendee", {
        scroll: true,
      });
    } catch (error) {
      console.log(error instanceof AxiosError && error.response?.data.error);
    }
  };

  const initialValues: AnswerSchema = {
    questions: quiz
      ? [
          ...Array.from({ length: quiz.questions.length }, () => {
            return {
              selected: null,
            };
          }),
        ]
      : [],
  };

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  return { quiz, error, errors, isPending, handleSubmit, setFieldValue };
}
