"use client";

import { useRouter } from "next/navigation";

import useCompleteQuiz from "@hooks/attendee/useCompleteQuiz";

import Title from "@components/Common/Title";
import Questions from "@components/Create/Questions";
import Question from "@components/Create/Question";
import Button from "@components/Create/Button";
import Empty from "@components/User/Empty";

export default function Create() {
  const {
    quiz,
    values,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useCompleteQuiz();

  const { replace } = useRouter();

  return (
    <section>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Title title={quiz.title} difficulty={quiz.difficulty} />

        {quiz.questions.length === 0 && <Empty reason="Loading Quiz..." />}

        {quiz.questions.length !== 0 && (
          <Questions>
            {quiz.questions.map((question, i) => (
              <Question
                key={i}
                index={i}
                disabled
                {...question}
                values={values}
                onSelect={setFieldValue}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            ))}
          </Questions>
        )}

        <hr />

        {quiz.questions.length !== 0 && (
          <div className="buttons">
            <Button
              type="button"
              label="Cancel"
              onClick={() => replace("/attendee")}
            />

            <Button label="Submit Quiz" />
          </div>
        )}
      </form>
    </section>
  );
}
