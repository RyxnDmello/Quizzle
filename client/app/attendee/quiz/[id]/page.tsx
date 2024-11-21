"use client";

import { useRouter } from "next/navigation";

import useCompleteQuiz from "@hooks/attendee/useCompleteQuiz";

import Title from "@components/Creator/Title";
import Questions from "@components/Attendees/Questions";
import Question from "@components/Attendees/Question";

import Button from "@components/Inputs/Button";
import Empty from "@components/Common/Empty";
import Error from "@components/Common/Error";

export default function Create() {
  const {
    quiz,
    fetchError,
    completeError,
    formErrors,
    isFetchPending,
    isCompletePending,
    setFieldValue,
    handleSubmit,
  } = useCompleteQuiz();

  const { replace } = useRouter();

  if (isFetchPending) {
    return (
      <section id="attendee">
        <Empty reason="Getting Your Quiz Ready..." />
      </section>
    );
  }

  if (!quiz || fetchError) {
    return (
      <section id="attendee">
        {!fetchError && (
          <Empty
            url="/attendee"
            reason="Failed To Fetch Quiz."
            label="Go To Dashboard."
          />
        )}

        {fetchError && (
          <Empty
            url="/attendee"
            reason={`${fetchError.response!.data.error}.`}
            label="Back To Dashboard."
          />
        )}
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
                errors={formErrors}
                onSelect={setFieldValue}
              />
            ))}
          </Questions>
        )}

        {quiz.questions.length !== 0 && <hr />}

        {quiz.questions.length !== 0 && (
          <div className="buttons">
            <Button
              onClick={() => replace("/attendee", { scroll: true })}
              label="Cancel"
              type="button"
            />

            <Button
              label={isCompletePending ? "Submitting Quiz..." : "Submit Quiz"}
            />
          </div>
        )}
      </form>

      <Error error={completeError} />
    </section>
  );
}
