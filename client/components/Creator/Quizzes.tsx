import styles from "./Quizzes.module.scss";

import Quiz from "./Quiz/Quiz";

export default function Quizzes() {
  return (
    <div className={styles.quizzes}>
      {Array.from({ length: 12 }, (_, i) => (
        <Quiz key={i} />
      ))}
    </div>
  );
}
