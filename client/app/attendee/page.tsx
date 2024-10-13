"use client";

import useFetchQuizzes from "@hooks/attendee/useFetchQuizzes";
import useFilterQuizzes from "@hooks/common/useFilterQuizzes";
import useJoinQuiz from "@hooks/attendee/useJoinQuiz";

import Title from "@components/Common/Title";
import Controller from "@components/User/Controller";
import Quizzes from "@components/User/Quizzes";
import Quiz from "@components/User/Quiz/Quiz";
import Empty from "@components/User/Empty";
import Input from "@components/Create/Question/Input";
import Button from "@components/Create/Button";

export default function Creator() {
  const { quizzes } = useFetchQuizzes();
  const { filter, handleSetPrompt } = useFilterQuizzes(quizzes);
  const { errors, handleBlur, handleChange, handleSubmit } = useJoinQuiz();

  return (
    <section id="attendee">
      <Title title="Enter A Quiz" difficulty="NULL" />

      <form id="join" onSubmit={handleSubmit}>
        <Input name="code" onBlur={handleBlur} onChange={handleChange} />
        <Button type="submit" label="Join Quiz" />
        {errors.code && <p>{errors.code}</p>}
      </form>

      <hr />

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
