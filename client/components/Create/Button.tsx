import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

export default function Button({ type = "submit", label, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[type]}`}
      onClick={() => type === "button" && onClick!()}
    >
      {label}
    </button>
  );
}
