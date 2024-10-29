import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";

import AnsweredQuiz from "@interfaces/Answer";

import useAuth from "@hooks/authentication/useAuth";

export default function useFetchAnsweredQuiz() {
  const { user } = useAuth();
  const { attendee } = useParams<{ attendee: string }>();

  const fetchAnsweredQuiz = async () => {
    const { data } = await axios.get<AnsweredQuiz>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/quiz/${attendee}/answer`,
      {
        headers: {
          Authorization: `Bearer ${user!.accessToken}`,
        },
      }
    );

    console.log("Answered Quiz:", data);

    return data;
  };

  const {
    data: quiz,
    error,
    isPending,
  } = useQuery({
    queryKey: ["quiz", attendee, "attendee", "answer"],
    queryFn: fetchAnsweredQuiz,
  });

  return { quiz, error, isPending };
}
