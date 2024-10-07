import { ChangeEvent, FocusEvent } from "react";

import Input from "./Input";

import styles from "./Option.module.scss";

interface OptionProps {
  value?: string;
  name?: string;
  error?: string;
  isSelected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Option({
  name,
  value,
  error,
  disabled =false,
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
        name={name}
        value={value}
        disabled={disabled}
        placeholder="Enter Option"
        error={error}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
}
