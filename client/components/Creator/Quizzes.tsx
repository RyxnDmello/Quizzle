import styles from "./Quizzes.module.scss";

import { Quiz as _ } from "@interfaces/Quiz";

import Quiz from "./Quiz/Quiz";

interface QuizzesProps {
  quizzes: _[];
}

export default function Quizzes({ quizzes }: QuizzesProps) {
  return (
    <div className={styles.quizzes}>
      {quizzes.map((quiz) => (
        <Quiz key={quiz.id} {...quiz} />
      ))}
    </div>
  );
}
