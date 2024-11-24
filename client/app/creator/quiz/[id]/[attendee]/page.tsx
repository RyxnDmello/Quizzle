"use client";

import { useRouter } from "next/navigation";

import { DIFFICULTY, OPTIONS } from "@interfaces/Quiz";

import useFetchCreatedQuiz from "@hooks/creator/useFetchCreatedQuiz";
import useFetchAnsweredQuiz from "@hooks/creator/useFetchAnsweredQuiz";

import Title from "@components/Creator/Title";
import Participant from "@components/Creator/Participant";
import Questions from "@components/Creator/Questions";
import Question from "@components/Creator/Question";
import Statistic from "@components/Creator/Statistic";
import Button from "@components/Inputs/Button";
import Empty from "@components/Common/Empty";

export default function Answers() {
  const {
    quiz: createdQuiz,
    error: fetchCreatedQuizError,
    isPending: isFetchCreatedQuizPending,
  } = useFetchCreatedQuiz();

  const {
    quiz: answeredQuiz,
    fetchError: fetchAnsweredQuizError,
    isFetchPending: isFetchAnsweredQuizPending,
  } = useFetchAnsweredQuiz();

  const { back } = useRouter();

  if (isFetchCreatedQuizPending || isFetchAnsweredQuizPending) {
    return (
      <section id="attendee">
        <Empty reason="Fetching Quiz..." />
      </section>
    );
  }

  if (fetchCreatedQuizError) {
    return (
      <section id="attendee">
        <Empty
          reason={`${fetchCreatedQuizError.response?.data.error}.`}
          label="Go To Dashboard."
          url="/attendee"
        />
      </section>
    );
  }

  if (fetchAnsweredQuizError) {
    return (
      <section id="attendee">
        <Empty
          reason={`${fetchAnsweredQuizError.response?.data.error}.`}
          label="Go To Dashboard."
          url="/attendee"
        />
      </section>
    );
  }

  if (!createdQuiz || !answeredQuiz) {
    return (
      <section id="attendee">
        <Empty reason="Failed To Fetch Quiz" />
      </section>
    );
  }

  return (
    <section id="attendee" className="answer">
      <Title
        title={createdQuiz.title}
        difficulty={createdQuiz.difficulty as DIFFICULTY}
      />

      <Participant
        name={answeredQuiz.participantName}
        date={answeredQuiz.completionDate}
      />

      <hr />

      {createdQuiz.questions.length !== 0 && (
        <Questions>
          {createdQuiz.questions.map((_, i) => (
            <Question
              key={i}
              index={i}
              values={{
                ...createdQuiz,
                questions: [
                  ...createdQuiz.questions.map((q, j) => ({
                    ...q,
                    selected: answeredQuiz.questions[j].selected as OPTIONS,
                  })),
                ],
              }}
              disabled
            />
          ))}
        </Questions>
      )}

      {createdQuiz.questions.length !== 0 && <hr />}

      {createdQuiz.questions.length !== 0 && (
        <div className="buttons">
          <Button type="button" label="Go Back" onClick={back} />

          <Statistic
            icon="/quiz/completed.png"
            value={`${
              answeredQuiz.questions.filter((q) => q.points !== 0).length
            }/${answeredQuiz.questions.length}`}
          />

          <Statistic
            icon="/quiz/trophy.png"
            value={`${answeredQuiz.finalPoints}/${answeredQuiz.totalPoints}`}
          />
        </div>
      )}
    </section>
  );
}
