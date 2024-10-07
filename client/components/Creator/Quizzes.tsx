import { ReactNode } from "react";

import styles from "./Quizzes.module.scss";

interface QuizzesProps {
  children: ReactNode;
}

export default function Quizzes({ children }: QuizzesProps) {
  return <div className={styles.quizzes}>{children}</div>;
}
