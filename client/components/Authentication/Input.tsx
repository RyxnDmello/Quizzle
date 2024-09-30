import { HTMLInputTypeAttribute } from "react";
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
}

export default function Input({
  type = "text",
  name,
  label,
  error,
  placeholder,
  required = true,
}: InputProps) {
  const { typeable, icon, handleToggle } = usePassword();

  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        className={styles[type]}
        type={type === "password" ? typeable : type}
        placeholder={placeholder}
      />

      {error && <p>{error}</p>}

      {type === "password" && (
        <Image
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
