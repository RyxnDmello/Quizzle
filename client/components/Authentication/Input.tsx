import { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from "react";
import Image from "next/image";

import usePassword from "@hooks/usePassword";

import styles from "./Input.module.scss";

interface InputProps {
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  error?: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement, Element>) => void;
}

export default function Input({
  type = "text",
  name,
  label,
  error,
  placeholder,
  required = true,
  onChange,
  onBlur,
}: InputProps) {
  const { typeable, icon, handleToggle } = usePassword();

  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        className={styles[type]}
        type={type === "password" ? typeable : type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <p>{error}</p>}

      {type === "password" && (
        <Image
          className={error && styles.correction}
          onClick={handleToggle}
          alt="toggle"
          height={512}
          width={512}
          src={icon}
        />
      )}

      {required && <span>*</span>}
    </div>
  );
}
