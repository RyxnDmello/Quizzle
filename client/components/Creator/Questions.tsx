import { ReactNode } from "react";

import styles from "./Questions.module.scss";

interface QuestionsProps {
  children: ReactNode;
}

export default function Questions({ children }: QuestionsProps) {
  return <div className={styles.questions}>{children}</div>;
}
