import styles from "./Option.module.scss";

import Text from "./Text";

interface OptionProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function Option({ label, isSelected, onSelect }: OptionProps) {
  return (
    <div className={styles.option} onClick={onSelect}>
      <div className={isSelected ? styles.selected : ""}>
        <div></div>
      </div>

      <Text label={label} />
    </div>
  );
}
