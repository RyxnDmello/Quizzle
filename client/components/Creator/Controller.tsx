import styles from "./Controller.module.scss";

interface ControllerProps {
  onChange: (prompt: string) => void;
}

export default function Controller({ onChange }: ControllerProps) {
  return (
    <form className={styles.controller}>
      <input
        type="text"
        placeholder="Search By Name..."
        onChange={(e) => onChange(e.target.value)}
      />

      <div></div>
    </form>
  );
}
