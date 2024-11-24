import styles from "./Option.module.scss";

interface OptionProps {
  value?: string;
  label: string;
}

export default function Option({ value, label }: OptionProps) {
  return (
    <option className={styles.option} value={value}>
      {label}
    </option>
  );
}
