import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";

import useFetchCreatedQuiz from "./useFetchCreatedQuiz";

import AnsweredQuiz from "@interfaces/Answer";

import useAuth from "@hooks/authentication/useAuth";

export default function useFetchAnsweredQuizzes() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();

  const {
    quiz,
    error: fetchError,
    isPending: isFetchPending,
  } = useFetchCreatedQuiz();

  const handleFetchAnsweredQuizzes = async () => {
    const { data } = await axios.get<AnsweredQuiz[]>(`/api/quiz/answer/${id}`, {
      headers: {
        Authorization: `Bearer ${user!.accessToken}`,
      },
    });

    return data ?? [];
  };

  const {
    data: participants,
    error: fetchParticipantsError,
    isPending: isFetchParticipantsPending,
  } = useQuery<unknown, AxiosError<{ error: string }>, AnsweredQuiz[]>({
    queryKey: ["quiz", id, "answer"],
    queryFn: handleFetchAnsweredQuizzes,
  });

  return {
    quiz,
    participants,
    fetchError,
    fetchParticipantsError,
    isFetchPending,
    isFetchParticipantsPending,
  };
}
