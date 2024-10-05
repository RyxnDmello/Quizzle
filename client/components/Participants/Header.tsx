import { DIFFICULTY } from "@interfaces/Quiz";

import Title from "./Header/Title";
import Details from "./Header/Details";

import styles from "./Header.module.scss";

interface HeaderProps {
  url: string;
  title: string;
  difficulty: DIFFICULTY;
}

export default function Header({ url, title, difficulty = "MEDIUM" }: HeaderProps) {
  return (
    <div className={styles.header}>
      <Title title={title} difficulty={difficulty} />
      <Details url={url} />
    </div>
  );
}
