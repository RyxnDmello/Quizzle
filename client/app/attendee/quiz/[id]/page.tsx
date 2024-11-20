"use client";

import { useRouter } from "next/navigation";

import useCompleteQuiz from "@hooks/attendee/useCompleteQuiz";

import Title from "@components/Creator/Title";
import Questions from "@components/Attendees/Questions";
import Question from "@components/Attendees/Question";

import Button from "@components/Inputs/Button";
import Empty from "@components/Common/Empty";

export default function Create() {
  const { quiz, error, errors, isPending, setFieldValue, handleSubmit } =
    useCompleteQuiz();

  const { replace } = useRouter();

  if (isPending) {
    return (
      <section id="attendee">
        <Empty reason={isPending && "Creating Your Quiz..."} />
      </section>
    );
  }

  if (!quiz || error) {
    return (
      <section id="attendee">
        <Empty reason="Failed To Fetch Quiz" />
      </section>
    );
  }

  return (
    <section id="quiz">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Title title={quiz.title} difficulty={quiz.difficulty} />

        {quiz.questions.length === 0 && (
          <Empty reason="Creating Your Quiz..." />
        )}

        {quiz.questions.length !== 0 && (
          <Questions>
            {quiz.questions.map((_, i) => (
              <Question
                key={i}
                index={i}
                details={quiz}
                errors={errors}
                onSelect={setFieldValue}
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
