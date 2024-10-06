import { DIFFICULTY } from "@interfaces/Quiz";

import styles from "./Title.module.scss";

interface TitleProps {
  title: string;
  difficulty: DIFFICULTY;
}

export default function Title({ title, difficulty }: TitleProps) {
  return (
    <div className={styles.title}>
      <div className={styles[difficulty.toLowerCase()]}></div>
      <h4>{title}</h4>
    </div>
  );
}