"use client";

import { useRouter } from "next/navigation";

import useFetchQuizzes from "@hooks/creator/useFetchQuizzes";
import useFilterQuizzes from "@hooks/common/useFilterQuizzes";

import Controller from "@components/User/Controller";
import Quizzes from "@components/User/Quizzes";
import Quiz from "@components/User/Quiz/Quiz";
import Pagination from "@components/User/Pagination";
import Empty from "@components/User/Empty";

export default function Creator() {
  const { quizzes } = useFetchQuizzes();
  const { filter, handleSetPrompt } = useFilterQuizzes(quizzes);

  const { push } = useRouter();

  const handleNavigate = (id: string) => push(`/creator/quiz/${id}`);

  return (
    <section>
      <Controller onChange={handleSetPrompt} />

      {quizzes.length === 0 && (
        <Empty
          url="/creator/quiz/create"
          reason="No Quizzes Available."
          label="Create Quiz"
        />
      )}

      {quizzes.length !== 0 && (
        <Quizzes>
          {(filter.length === 0 ? quizzes : filter).map((quiz) => (
            <Quiz
              key={quiz.id}
              {...quiz}
              onClick={() => handleNavigate(quiz.id!)}
            />
          ))}
        </Quizzes>
      )}

      {quizzes.length !== 0 && <Pagination pages={5} />}
    </section>
  );
}
