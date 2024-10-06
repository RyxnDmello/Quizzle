import { ChangeEvent, FocusEvent } from "react";

import Input from "./Input";

import styles from "./Option.module.scss";

interface OptionProps {
  name: string;
  error?: string;
  isSelected: boolean;
  onSelect: () => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Option({
  name,
  error,
  isSelected,
  onSelect,
  onBlur,
  onChange,
}: OptionProps) {
  return (
    <div className={styles.option} onClick={onSelect}>
      <div>
        <div className={`${isSelected && styles.selected}`}></div>
      </div>

      <Input
        type="text"
        placeholder="Enter Option"
        name={name}
        error={error}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
}
