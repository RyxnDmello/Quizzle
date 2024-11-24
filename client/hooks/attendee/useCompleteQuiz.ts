import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";

import useAuth from "@hooks/authentication/useAuth";

import QuizSchema from "@schemas/QuizSchema";
import AnswerSchema, { validationSchema } from "@schemas/AnswerSchema";

export default function useCompleteQuiz() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const { replace } = useRouter();

  const onFetchQuiz = async () => {
    const { data } = await axios.get<QuizSchema>(`/api/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${user!.accessToken}`,
      },
    });

    return data;
  };

  const onCompleteQuiz = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/quiz/answer/${id}`,
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

    replace("/attendee", { scroll: true });
  };

  const {
    data: quiz,
    error: fetchError,
    isPending: isFetchPending,
  } = useQuery<QuizSchema, AxiosError<{ error: string }>, QuizSchema>({
    queryKey: ["attendee", id],
    queryFn: onFetchQuiz,
  });

  const {
    error: completeError,
    isPending: isCompletePending,
    mutate: onSubmit,
  } = useMutation<void, AxiosError<{ error: string }>, void>({
    mutationKey: ["quiz", id, "answer"],
    mutationFn: onCompleteQuiz,
  });

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

  const {
    values,
    errors: formErrors,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: () => onSubmit(),
  });

  return {
    quiz,
    fetchError,
    completeError,
    formErrors,
    isFetchPending,
    isCompletePending,
    handleSubmit,
    setFieldValue,
  };
}
