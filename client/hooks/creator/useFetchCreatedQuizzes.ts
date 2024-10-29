import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import useAuth from "@hooks/authentication/useAuth";

import Quiz from "@interfaces/Quiz";

export default function useFetchCreatedQuizzes() {
  const { user } = useAuth();

  const fetchQuizzes = async () => {
    const { data } = await axios.get<Quiz[]>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/quiz/${user!.id}`,
      {
        headers: {
          Authorization: `Bearer ${user!.accessToken}`,
        },
      }
    );

    return data || [];
  };

  const { data, error, isPending } = useQuery<Quiz[]>({
    queryKey: ["quiz"],
    queryFn: fetchQuizzes,
  });

  return { quizzes: data, error, isPending };
}
