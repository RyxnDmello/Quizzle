import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";

import useAuth from "@hooks/authentication/useAuth";

import AnsweredQuiz from "@interfaces/Answer";

interface PaginationResponse {
  quizzes: AnsweredQuiz[];
  pages: number;
}

export default function useFetchQuizzes() {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [filter, seFilter] = useState<string | undefined>(undefined);

  const { user } = useAuth();

  const fetchQuizzes = async () => {
    const response = await axios.get<AnsweredQuiz[]>(
      `/api/quiz/answer/${
        user!.id
      }/?filter=${filter}&sort=${sort}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );

    return response.data;
  };

  const handleSwitch = async (page: number) => {
    setPage(() => page);
    await refetch();
    await refetch();
  };

  const handleSort = async (sort: string | undefined) => {
    setSort(() => sort);
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
    error,
    isPending,
    refetch,
  } = useQuery<unknown, AxiosError<{ error: string }>, PaginationResponse>({
    queryKey: ["attendee", "quiz", filter, sort, page],
    queryFn: fetchQuizzes,
  });

  return {
    page,
    pagination,
    error,
    isPending,
    handleFilter,
    handleSort,
    handleSwitch,
  };
}
