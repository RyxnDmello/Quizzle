import { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from "react";

import styles from "./Input.module.scss";

interface InputProps {
  type?: HTMLInputTypeAttribute;
  name: string;
  error?: string;
  placeholder: string;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = "text",
  name,
  error,
  placeholder,
  onBlur,
  onChange,
}: InputProps) {
  return (
    <div className={styles.input}>
      <input
        type={type}
        name={name}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <p>{error}</p>}
    </div>
  );
}
