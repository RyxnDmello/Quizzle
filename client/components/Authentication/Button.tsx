import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export default function Button({ label, disabled = false }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${disabled && styles.disabled}`}
      disabled={disabled}
      type="submit"
    >
      {label}
    </button>
  );
}
