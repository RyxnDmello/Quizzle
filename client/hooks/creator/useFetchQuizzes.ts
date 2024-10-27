import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Quiz from "@interfaces/Quiz";

export default function useFetchQuizzes() {
  const fetchQuizzes = async () => {
    const { data } = await axios.get<Quiz[]>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/quiz/CIDD14497F38`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMDM4NDAxLCJpYXQiOjE3MzAwMzgxMDEsImp0aSI6ImFiNGRlMDUyNDhjYjQ2NmNhNmU1MjRmODRiYTExZjlkIiwidXNlcl9pZCI6MX0.9eYDF6zrs1EiAR7GQZnGmKWAdByFDe5HeJNGxgKGu2k",
        },
      }
    );

    console.log(data)
  
    return data;
  };

  const { data, error, isPending } = useQuery<Quiz[]>({
    queryKey: ["quiz"],
    queryFn: fetchQuizzes,
  });

  return { quizzes: data, error, isPending };
}
