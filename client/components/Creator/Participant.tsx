import { getFormattedDate } from "@utils/getDateTime";

import styles from "./Participant.module.scss";

interface ParticipantProps {
  name: string;
  date: string;
}

export default function Participant({ name, date }: ParticipantProps) {
  return (
    <div className={styles.participant}>
      <h4>{name}</h4>
      <p>{getFormattedDate(date)}</p>
    </div>
  );
}
