"use client";

import useFetchQuizzes from "@hooks/attendee/useFetchQuizzes";
import useFilterQuizzes from "@hooks/attendee/useFilterQuizzes";
import useJoinQuiz from "@hooks/attendee/useJoinQuiz";

import Title from "@components/Common/Title";
import Join from "@components/Catalogue/Join";

import Controller from "@components/Catalogue/Controller";
import Search from "@components/Catalogue/Controller/Search";

import Quizzes from "@components/Catalogue/Quizzes";
import Quiz from "@components/Catalogue/Quiz/Quiz";

import Pagination from "@components/Catalogue/Pagination";
import Empty from "@components/Common/Empty";

export default function Creator() {
  const { quizzes, error, isPending } = useFetchQuizzes();
  const { filter, handleSetPrompt } = useFilterQuizzes(quizzes || []);
  const { errors, handleBlur, handleChange, handleSubmit } = useJoinQuiz();

  return (
    <section id="catalogue">
      <Title>
        Join A Qui<span>zz</span>
      </Title>

      <Join
        error={errors.code}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />

      <hr />

      <Controller onSubmit={() => {}}>
        <Search placeholder="Search By Name" onChange={handleSetPrompt} />
      </Controller>

      {isPending && <Empty reason="Fetching Your Quizzes..." />}

      {error && <Empty reason={error.response!.data.error} />}

      {!quizzes ||
        (quizzes.length === 0 && <Empty reason="No Quizzes Attempted." />)}

      {!isPending && quizzes && quizzes.length !== 0 && (
        <Quizzes>
          {(filter.length === 0 ? quizzes : filter).map((quiz) => (
            <Quiz
              key={quiz.quizID}
              title={quiz.quizTitle}
              difficulty={quiz.quizDifficulty}
              points={quiz.finalPoints}
              length={quiz.questions.length}
            />
          ))}
        </Quizzes>
      )}

      {!isPending && quizzes && quizzes.length !== 0 && (
        <Pagination pages={5} />
      )}
    </section>
  );
}
