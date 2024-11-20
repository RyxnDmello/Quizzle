import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";

import useFetchCreatedQuizzes from "./useFetchCreatedQuizzes";

import AnsweredQuiz from "@interfaces/Answer";

import useAuth from "@hooks/authentication/useAuth";

export default function useFetchAnsweredQuizzes() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { quizzes } = useFetchCreatedQuizzes();

  const fetchAnsweredQuizzes = async () => {
    const { data } = await axios.get<AnsweredQuiz[]>(`/api/quiz/${id}/answer`, {
      headers: {
        Authorization: `Bearer ${user!.accessToken}`,
      },
    });

    return data || [];
  };

  const quiz = quizzes?.filter((quiz) => quiz.id === id)[0];

  const {
    data: participants,
    error,
    isPending,
  } = useQuery({
    queryKey: ["quiz", id, "answer"],
    queryFn: fetchAnsweredQuizzes,
  });

  return { quiz, participants, error, isPending };
}
