import { ReactNode } from "react";

import styles from "./Form.module.scss";

interface FormProps {
  children: ReactNode;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
