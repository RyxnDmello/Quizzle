import { AxiosError } from "axios";

import styles from "./Error.module.scss";

interface ErrorProps {
  error?: AxiosError<{ error: string }> | Error | null;
  fontSize?: string;
}

export default function Error({ error, fontSize = "1rem" }: ErrorProps) {
  if (!error) return;

  return (
    <p className={`${styles.error} error`} style={{ fontSize }}>
      {error instanceof AxiosError ? error.response?.data.error : error.message}
    </p>
  );
}
