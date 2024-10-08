"use client";

import useFetchQuizzes from "@hooks/attendee/useFetchQuizzes";
import useFilterQuizzes from "@hooks/common/useFilterQuizzes";

import Controller from "@components/User/Controller";
import Quizzes from "@components/User/Quizzes";
import Quiz from "@components/User/Quiz/Quiz";
import Empty from "@components/User/Empty";

export default function Creator() {
  const { quizzes } = useFetchQuizzes();
  const { filter, handleSetPrompt } = useFilterQuizzes(quizzes);

  return (
    <section>
      <Controller onChange={handleSetPrompt} />

      {quizzes.length === 0 && <Empty reason="No Quizzes Completed." />}

      {quizzes.length !== 0 && (
        <Quizzes>
          {(filter.length === 0 ? quizzes : filter).map((quiz) => (
            <Quiz key={quiz.id} {...quiz} />
          ))}
        </Quizzes>
      )}
    </section>
  );
}
