import { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from "react";
import Image, { StaticImageData } from "next/image";

import styles from "./Input.module.scss";

interface InputProps {
  type?: HTMLInputTypeAttribute;
  icon?: StaticImageData | string;
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
  icon,
  value,
  name,
  error,
  disabled = false,
  placeholder,
  onBlur,
  onChange,
}: InputProps) {
  return (
    <div
      className={`${styles.input} ${icon && styles.icon} ${
        error && styles.error
      }`}
    >
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

      {icon && <Image src={icon} width={512} height={512} alt="icon" />}
    </div>
  );
}
