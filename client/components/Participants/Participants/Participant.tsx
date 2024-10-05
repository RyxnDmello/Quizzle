import { Fragment } from "react";
import Image from "next/image";

import Trophy from "@public/quiz/trophy.png";

import styles from "./Participant.module.scss";

interface ParticipantProps {
  name?: string;
  date?: string;
  correct?: number;
  incorrect?: number;
  points?: number;
  isHeader?: boolean;
}

export default function Participant({
  name,
  date,
  correct,
  incorrect,
  points,
  isHeader = false,
}: ParticipantProps) {
  return (
    <div className={`${styles.participant} ${isHeader && styles.header}`}>
      <div>{isHeader ? "Participant" : name}</div>
      <div>{isHeader ? "Date of Completion" : date}</div>
      <div>{isHeader ? "Correct Answers" : correct}</div>
      <div>{isHeader ? "Incorrect Answers" : incorrect}</div>
      <div>
        {isHeader ? (
          "Points Scored"
        ) : (
          <Fragment>
            <Image src={Trophy} height={512} width={512} alt="trophy" />
            {points}
          </Fragment>
        )}
      </div>
    </div>
  );
}
