import Participant from "./Participants/Participant";

import styles from "./Participants.module.scss";

export default function Participants() {
  return (
    <div className={styles.participants}>
      <Participant isHeader />

      {Array.from({ length: 10 }, (_, i) => (
        <Participant
          key={i}
          name="Ryan Nolasco D Mello"
          date="05/10/2024"
          correct={5}
          incorrect={10}
          points={50}
        />
      ))}
    </div>
  );
}
