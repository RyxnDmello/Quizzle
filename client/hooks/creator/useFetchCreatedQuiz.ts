import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";

import Quiz from "@interfaces/Quiz";

import useAuth from "@hooks/authentication/useAuth";

export default function useFetchCreatedQuiz() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const fetchQuiz = async () => {
    const { data } = await axios.get<Quiz>(`/api/quiz/${id}`, {
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
  } = useQuery<Quiz>({
    queryKey: ["quiz", id],
    queryFn: fetchQuiz,
  });

  return { quiz, error, isPending };
}
