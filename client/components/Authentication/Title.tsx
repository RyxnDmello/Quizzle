import styles from "./Title.module.scss";

interface TitleProps {
  primary: string;
  secondary: string;
}

export default function Title({ primary, secondary }: TitleProps) {
  return (
    <h4 className={styles.title}>
      {primary} <span>{secondary}</span>
    </h4>
  );
}
