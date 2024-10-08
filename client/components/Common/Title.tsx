import { DIFFICULTY } from "@interfaces/Quiz";

import styles from "./Title.module.scss";

interface TitleProps {
  title: string;
  difficulty: DIFFICULTY | "NULL";
}

export default function Title({ title, difficulty }: TitleProps) {
  return (
    <div className={styles.title}>
      {difficulty !== "NULL" && (
        <div className={styles[difficulty.toLowerCase()]}></div>
      )}
     
      {title && <h4>{title}</h4>}
    </div>
  );
}
