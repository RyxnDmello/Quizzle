import { useParams } from "next/navigation";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import Trophy from "@public/quiz/trophy.png";

import styles from "./Participant.module.scss";

interface ParticipantProps {
  attendee?: string;
  name?: string;
  date?: string;
  correct?: number;
  questions?: number;
  points?: number;
  isHeader?: boolean;
}

export default function Participant({
  attendee,
  name,
  date,
  correct,
  points,
  questions,
  isHeader = false,
}: ParticipantProps) {
  const { id } = useParams<{ id: string }>();

  const url = attendee && `/creator/quiz/${id}/${attendee}`;

  return (
    <Link
      href={url || "#"}
      className={`${styles.participant} ${isHeader && styles.header}`}
    >
      <div>{isHeader ? "Participant" : name}</div>
      <div>{isHeader ? "Date of Completion" : date}</div>
      <div>{isHeader ? "Correct Answers" : correct}</div>
      <div>{isHeader ? "Incorrect Answers" : questions! - correct!}</div>
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
    </Link>
  );
}
