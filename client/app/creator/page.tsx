"use client";

import { useRouter } from "next/navigation";

import useFetchQuizzes from "@hooks/creator/useFetchQuizzes";
import useFilterQuizzes from "@hooks/common/useFilterQuizzes";

import Controller from "@components/Creator/Controller";
import Quizzes from "@components/Creator/Quizzes";
import Quiz from "@components/Creator/Quiz/Quiz";

export default function Creator() {
  const { quizzes } = useFetchQuizzes();
  const { filter, handleSetPrompt } = useFilterQuizzes(quizzes);

  const { push } = useRouter();

  const handleNavigate = (id: string) => push(`/creator/quiz/${id}`);

  return (
    <section>
      <Controller onChange={handleSetPrompt} />

      <Quizzes>
        {(filter.length === 0 ? quizzes : filter).map((quiz) => (
          <Quiz
            key={quiz.id}
            {...quiz}
            onClick={() => handleNavigate(quiz.id!)}
          />
        ))}
      </Quizzes>
    </section>
  );
}