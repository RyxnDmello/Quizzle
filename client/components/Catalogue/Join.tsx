import { ChangeEvent, FocusEvent } from "react";

import Input from "@components/Inputs/Input";
import Button from "@components/Inputs/Button";

import styles from "./Join.module.scss";

interface JoinProps {
  label: string;
  error?: string;
  disabled?: boolean;
  onSubmit: () => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Join({
  error,
  disabled = false,
  label,
  onBlur,
  onChange,
  onSubmit,
}: JoinProps) {
  return (
    <form className={styles.join} onSubmit={onSubmit}>
      <Input
        name="code"
        placeholder="Enter Quiz Code"
        onBlur={onBlur}
        onChange={onChange}
      />

      <Button type="submit" disabled={disabled} label={label} />

      {error && <p>{error}</p>}
    </form>
  );
}
