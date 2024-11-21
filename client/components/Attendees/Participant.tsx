import { useParams } from "next/navigation";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import { getFormattedDate } from "@utils/getDateTime";

import _ from "@interfaces/Answer";

import Trophy from "@public/quiz/trophy.png";

import styles from "./Participant.module.scss";

interface ParticipantProps extends _ {
  isHeader?: boolean;
}

export default function Participant({
  attendeeID,
  participantName,
  finalPoints,
  completionDate,
  questions,
  isHeader,
}: ParticipantProps) {
  const { id } = useParams<{ id: string }>();

  const url = attendeeID && `/creator/quiz/${id}/${attendeeID}`;

  const correct =
    questions && questions.filter((question) => question.points !== 0).length;

  const incorrect =
    questions && questions.filter((question) => question.points === 0).length;

  const date = questions && getFormattedDate(completionDate);

  return (
    <Link
      className={`${styles.participant} ${isHeader && styles.header}`}
      href={url || "#"}
    >
      <div>{isHeader ? "Participant" : participantName}</div>
      <div>{isHeader ? "Date of Completion" : date}</div>
      <div>{isHeader ? "Correct Answers" : correct}</div>
      <div>{isHeader ? "Incorrect Answers" : incorrect}</div>
      <div>
        {isHeader ? (
          "Points Scored"
        ) : (
          <Fragment>
            <Image src={Trophy} height={512} width={512} alt="trophy" />
            {finalPoints}
          </Fragment>
        )}
      </div>
    </Link>
  );
}
