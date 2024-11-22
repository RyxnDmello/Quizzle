import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  type = "submit",
  label,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      onClick={() => type === "button" && onClick!()}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}
