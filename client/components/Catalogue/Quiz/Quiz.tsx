import Image from "next/image";

import _ from "@interfaces/Quiz";

import styles from "./Quiz.module.scss";

interface QuizProps extends _ {
  onClick?: () => void;
}

export default function Quiz({
  title,
  points,
  questions,
  difficulty,
  onClick,
}: QuizProps) {
  return (
    <div
      className={`${styles.quiz} ${onClick && styles.clickable}`}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles[difficulty.toLowerCase()]}></div>
        <h4>{title}</h4>
      </div>

      <div className={styles.details}>
        <p>{questions.length} Questions</p>

        <div>
          <Image
            src={"/quiz/trophy.png"}
            alt="points"
            height={512}
            width={512}
          />

          <p>{points}</p>
        </div>
      </div>
    </div>
  );
}
