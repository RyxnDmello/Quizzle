"use client";

import { useRouter } from "next/navigation";

import Trophy from "@public/quiz/trophy.png";

import useFetchQuiz from "@hooks/creator/useFetchQuiz";

import Title from "@components/Common/Title";
import Questions from "@components/Create/Questions";
import Question from "@components/Create/Question";
import Button from "@components/Create/Button";
import Statistic from "@components/Create/Statistic";

export default function Answers() {
  const { quiz, points, correct } = useFetchQuiz();
  const { back } = useRouter();

  return (
    <section>
      <form onSubmit={() => {}}>
        <Title {...quiz} />

        <Questions>
          {quiz.questions.map((_, i) => (
            <Question key={i} index={i} values={quiz} disabled />
          ))}
        </Questions>

        <hr />

        <div className="buttons">
          <Button type="button" label="Cancel" onClick={back} />
          <Statistic icon={Trophy} value={points.toString()} />
          <Statistic icon={Trophy} value={correct.toString()} />
        </div>
      </form>
    </section>
  );
}
