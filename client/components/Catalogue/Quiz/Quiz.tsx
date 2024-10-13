import Image from "next/image";

import { Quiz as _ } from "@interfaces/Quiz";

import styles from "./Quiz.module.scss";

interface QuizProps extends _ {
  onClick?: () => void;
}

export default function Quiz({
  name,
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
        <h4>{name}</h4>
      </div>

      <div className={styles.details}>
        <p>{questions} Questions</p>

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
