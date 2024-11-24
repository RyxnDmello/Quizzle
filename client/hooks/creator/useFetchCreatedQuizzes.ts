import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";

import useAuth from "@hooks/authentication/useAuth";

import Quiz from "@interfaces/Quiz";

interface PaginatedResponse {
  quizzes: Quiz[];
  pages: number;
}

export default function useFetchCreatedQuizzes() {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [filter, seFilter] = useState<string | undefined>(undefined);

  const { user } = useAuth();

  const fetchQuizzes = async () => {
    const { data } = await axios.get<PaginatedResponse>(
      `/api/quiz/${user!.id}/?filter=${filter}&sort=${sort}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${user!.accessToken}`,
        },
      }
    );

    return data;
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
  } = useQuery<unknown, AxiosError<{ error: string }>, PaginatedResponse>({
    queryKey: ["quiz"],
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
