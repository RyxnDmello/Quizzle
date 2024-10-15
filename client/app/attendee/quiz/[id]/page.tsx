"use client";

import { useRouter } from "next/navigation";

import useCompleteQuiz from "@hooks/attendee/useCompleteQuiz";

import Title from "@components/Create/Title";
import Questions from "@components/Create/Questions";
import Question from "@components/Create/Question";
import Button from "@components/Inputs/Button";
import Empty from "@components/Common/Empty";

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
    <section id="quiz">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Title title={quiz.title} difficulty={quiz.difficulty} />

        {quiz.questions.length === 0 && (
          <Empty reason="Creating Your Quiz..." />
        )}

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

        {quiz.questions.length !== 0 && <hr />}

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
