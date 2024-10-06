import { ReactNode } from "react";

import Participant from "./Participant";

import styles from "./Participants.module.scss";

interface ParticipantsProps {
  children: ReactNode;
}

export default function Participants({ children }: ParticipantsProps) {
  return (
    <div className={styles.participants}>
      <Participant isHeader />
      {children}
    </div>
  );
}
