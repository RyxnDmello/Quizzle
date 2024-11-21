import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import useAuth from "@hooks/authentication/useAuth";

export default function useDeleteQuiz() {
  const { id } = useParams<{ id: string }>();
  const { replace } = useRouter();
  const { user } = useAuth();

  const onDelete = async () => {
    await axios.delete(`/api/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${user!.accessToken}`,
      },
    });

    replace("/creator", { scroll: true });
  };

  const {
    error,
    isPending,
    mutate: handleDeleteQuiz,
  } = useMutation<void, AxiosError<{ error: string }>, void>({
    mutationKey: ["quiz", id],
    mutationFn: onDelete,
  });

  return { error, isPending, handleDeleteQuiz };
}
