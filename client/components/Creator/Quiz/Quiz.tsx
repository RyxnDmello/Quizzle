import Image from "next/image";

import Trophy from "@public/quiz/trophy.png";

import styles from "./Quiz.module.scss";

export default function Quiz() {
  return (
    <div className={styles.quiz}>
      <div className={styles.header}>
        <div className={styles.medium}></div>
        <h4>Next.js</h4>
      </div>

      <div className={styles.details}>
        <p>5 Questions</p>

        <div>
          <Image src={Trophy} height={512} width={512} alt="points" />
          <p>10</p>
        </div>
      </div>
    </div>
  );
}
