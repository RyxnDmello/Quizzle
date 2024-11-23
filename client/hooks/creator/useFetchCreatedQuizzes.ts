import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import useAuth from "@hooks/authentication/useAuth";

import Quiz from "@interfaces/Quiz";

export default function useFetchCreatedQuizzes() {
  const { user } = useAuth();

  const fetchQuizzes = async () => {
    const { data } = await axios.get<Quiz[]>(`/api/quiz/${user!.id}`, {
      headers: {
        Authorization: `Bearer ${user!.accessToken}`,
      },
    });

    return data || [];
  };

  const {
    data: quizzes,
    error,
    isPending,
  } = useQuery<Quiz[], AxiosError<{ error: string }>, Quiz[]>({
    queryKey: ["quiz"],
    queryFn: fetchQuizzes,
  });

  return { quizzes, error, isPending };
}
