import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";

import AnsweredQuiz from "@interfaces/Answer";

import useAuth from "@hooks/authentication/useAuth";

export default function useFetchAnsweredQuiz() {
  const { user } = useAuth();
  const { id, attendee } = useParams<{ id: string; attendee: string }>();

  const fetchAnsweredQuiz = async () => {
    const { data } = await axios.get<AnsweredQuiz>(`/api/quiz/${id}/answer`, {
      headers: {
        Authorization: `Bearer ${user!.accessToken}`,
      },
    });

    return data;
  };

  const {
    data: quiz,
    error: fetchError,
    isPending: isFetchPending,
  } = useQuery<unknown, AxiosError<{ error: string }>, AnsweredQuiz>({
    queryKey: ["quiz", attendee, "attendee", "answer"],
    queryFn: fetchAnsweredQuiz,
  });

  return { quiz, fetchError, isFetchPending };
}
