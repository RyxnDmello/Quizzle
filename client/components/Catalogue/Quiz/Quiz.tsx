import Image from "next/image";

import { DIFFICULTY } from "@interfaces/Quiz";

import styles from "./Quiz.module.scss";

interface QuizProps {
  title: string;
  points: number;
  length: number;
  difficulty: DIFFICULTY;
  onClick?: () => void;
}

export default function Quiz({
  title,
  points,
  length,
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
        <p>{length} Questions</p>

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
