import styles from "./Page.module.scss";

interface PageProps {
  page: number;
  isSelected: boolean;
  onClick: () => void;
}

export default function Page({ page, isSelected, onClick }: PageProps) {
  return (
    <button
      type="button"
      className={`${styles.page} ${isSelected && styles.selected}`}
      onClick={onClick}
    >
      <p>{page}</p>
    </button>
  );
}
