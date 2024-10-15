import { ChangeEvent, FocusEvent } from "react";

import Input from "../../Inputs/Input";

import styles from "./Option.module.scss";

interface OptionProps {
  value?: string;
  name?: string;
  error?: string;
  isCorrect?: boolean;
  isSelected?: boolean;
  inputDisabled?: boolean;
  radioDisabled?: boolean;
  onSelect?: () => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Option({
  name,
  value,
  error,
  isCorrect,
  isSelected,
  inputDisabled = false,
  radioDisabled = false,
  onSelect,
  onBlur,
  onChange,
}: OptionProps) {
  return (
    <div
      className={`${styles.option} ${isCorrect === true && styles.correct} ${
        isCorrect === false && styles.incorrect
      }`}
      onClick={onSelect}
    >
      <div
        className={`${isSelected && styles.selected} ${
          radioDisabled && styles.disabled
        }`}
      >
        <div></div>
      </div>

      <Input
        type="text"
        name={name}
        value={value}
        disabled={inputDisabled}
        placeholder="Enter Option"
        error={error}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
}
