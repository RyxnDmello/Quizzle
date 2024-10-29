import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";

import useFetchQuizzes from "./useFetchQuizzes";

import Participant from "@interfaces/Participant";

import useAuth from "@hooks/authentication/useAuth";

export default function useFetchParticipants() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { quizzes } = useFetchQuizzes();

  const fetchParticipants = async () => {
    const { data } = await axios.get<Participant[]>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/quiz/${id}/answer`,
      {
        headers: {
          Authorization: `Bearer ${user!.accessToken}`,
        },
      }
    );

    console.log(data);

    return data || [];
  };

  const quiz = quizzes?.filter((quiz) => quiz.id === id)[0];

  const { data: participants, error, isPending } = useQuery({
    queryKey: ["quiz", id, "answer"],
    queryFn: fetchParticipants,
  });

  console.log(error)

  return { quiz, participants, isPending };
}
