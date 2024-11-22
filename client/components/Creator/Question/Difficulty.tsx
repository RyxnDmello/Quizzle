import { useState } from "react";

import { DIFFICULTY } from "@interfaces/Quiz";

import styles from "./Difficulty.module.scss";

interface DifficultyProps {
  error?: string;
  difficulty?: DIFFICULTY;
  onSelect: (name: string, value: string) => void;
}

export default function Difficulty({
  difficulty = undefined,
  error,
  onSelect,
}: DifficultyProps) {
  const [option, setOption] = useState<DIFFICULTY | undefined>(difficulty);

  return (
    <div className={styles.difficulty}>
      <div>
        <p>
          Difficulty{" "}
          {option && (
            <span className={option && styles[option.toLowerCase()]}>
              • {option}
            </span>
          )}
        </p>

        <div>
          <span
            className={`${styles.hard} ${option === "HARD" && styles.selected}`}
            onClick={() => {
              onSelect("difficulty", "HARD");
              setOption("HARD");
            }}
          ></span>

          <span
            className={`${styles.medium} ${
              option === "MEDIUM" && styles.selected
            }`}
            onClick={() => {
              onSelect("difficulty", "MEDIUM");
              setOption("MEDIUM");
            }}
          ></span>

          <span
            className={`${styles.easy} ${option === "EASY" && styles.selected}`}
            onClick={() => {
              onSelect("difficulty", "EASY");
              setOption("EASY");
            }}
          ></span>
        </div>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}
