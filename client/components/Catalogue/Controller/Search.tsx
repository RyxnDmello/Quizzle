import styles from "./Search.module.scss";

interface SearchProps {
  placeholder: string;
  onChange?: (value: string) => void;
}

export default function Search({ placeholder, onChange }: SearchProps) {
  return (
    <input
      type="text"
      className={styles.search}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
}
