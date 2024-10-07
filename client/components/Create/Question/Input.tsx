import { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from "react";

import styles from "./Input.module.scss";

interface InputProps {
  type?: HTMLInputTypeAttribute;
  value?: string | number;
  name?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = "text",
  value,
  name,
  error,
  disabled = false,
  placeholder,
  onBlur,
  onChange,
}: InputProps) {
  return (
    <div className={styles.input}>
      <input
        value={value}
        type={type}
        name={name}
        disabled={disabled}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <p>{error}</p>}
    </div>
  );
}
