import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useState } from "react";

import useFetchCreatedQuiz from "./useFetchCreatedQuiz";

import AnsweredQuiz from "@interfaces/Answer";

import useAuth from "@hooks/authentication/useAuth";

interface PaginationResponse {
  participants: AnsweredQuiz[];
  pages: number;
}

export default function useFetchAnsweredQuizzes() {
  const [page, setPage] = useState<number>(1);
  const [filter, seFilter] = useState<string | undefined>(undefined);

  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();

  const {
    quiz,
    error: fetchError,
    isPending: isFetchPending,
  } = useFetchCreatedQuiz();

  const handleFetchAnsweredQuizzes = async () => {
    const { data } = await axios.get<PaginationResponse>(
      `/api/quiz/answer/${id}/?filter=${filter}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${user!.accessToken}`,
        },
      }
    );

    console.log(data)

    return data;
  };

  const handleSwitch = async (page: number) => {
    setPage(() => page);
    await refetch();
    await refetch();
  };

  const handleFilter = async (filter: string | undefined) => {
    seFilter(() => filter);
    await refetch();
    await refetch();
  };

  const {
    data: pagination,
    error: fetchParticipantsError,
    isPending: isFetchParticipantsPending,
    refetch,
  } = useQuery<unknown, AxiosError<{ error: string }>, PaginationResponse>({
    queryKey: ["quiz", "answer", id],
    queryFn: handleFetchAnsweredQuizzes,
  });

  console.log(pagination)

  return {
    quiz,
    page,
    pagination,
    fetchError,
    fetchParticipantsError,
    isFetchPending,
    isFetchParticipantsPending,
    handleFilter,
    handleSwitch,
  };
}
