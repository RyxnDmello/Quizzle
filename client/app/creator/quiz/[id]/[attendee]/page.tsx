"use client";

import { useRouter } from "next/navigation";

import useFetchQuiz from "@hooks/creator/useFetchQuiz";

import Title from "@components/Create/Title";
import Questions from "@components/Create/Questions";
import Question from "@components/Create/Question";
import Button from "@components/Inputs/Button";
import Statistic from "@components/Create/Statistic";
import Empty from "@components/Common/Empty";

export default function Answers() {
  const { quiz } = useFetchQuiz();
  const { back } = useRouter();

  const getCorrect = () => {
    if (quiz.questions.length === 0) return 0;

    return quiz.questions.filter(
      (question) => question.correct === question.selected
    ).length;
  };

  const getPoints = () => {
    const correct = quiz.questions.filter(
      (question) => question.correct === question.selected
    );

    return correct.reduce((prev, current) => {
      return { ...prev, points: prev.points + current.points };
    }).points;
  };

  return (
    <section id="attendee">
      <form onSubmit={() => {}}>
        <Title {...quiz} />

        {quiz.questions.length === 0 && <Empty reason="Fetching Quiz..." />}

        {quiz.questions.length !== 0 && (
          <Questions>
            {quiz.questions.map((_, i) => (
              <Question key={i} index={i} values={quiz} disabled />
            ))}
          </Questions>
        )}

        {quiz.questions.length !== 0 && <hr />}

        {quiz.questions.length !== 0 && (
          <div className="buttons">
            <Button type="button" label="Go Back" onClick={back} />

            <Statistic
              icon="/quiz/completed.png"
              value={`${getCorrect()}/${quiz.questions.length}`}
            />

            <Statistic icon="/quiz/trophy.png" value={`${getPoints()}`} />
          </div>
        )}
      </form>
    </section>
  );
}
