import { AxiosError } from "axios";

import styles from "./Error.module.scss";

interface ErrorProps {
  error?: AxiosError<{ error: string }> | null;
  fontSize?: string;
}

export default function Error({ error, fontSize = "1rem" }: ErrorProps) {
  if (!error) return;

  return (
    <p className={styles.error} style={{ fontSize }}>
      {error.response?.data.error}
    </p>
  );
}
