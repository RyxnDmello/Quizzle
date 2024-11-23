import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import useAuth from "@hooks/authentication/useAuth";

import AnsweredQuiz from "@interfaces/Answer";

export default function useFetchQuizzes() {
  const { user } = useAuth();

  const fetchQuizzes = async () => {
    const response = await axios.get<AnsweredQuiz[]>(`/api/quiz/${user!.id}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });

    return response.data;
  };

  const {
    data: quizzes,
    error,
    isPending,
  } = useQuery<unknown, AxiosError<{ error: string }>, AnsweredQuiz[]>({
    queryKey: ["quiz", user?.id],
    queryFn: fetchQuizzes,
  });

  return { quizzes, error, isPending };
}
