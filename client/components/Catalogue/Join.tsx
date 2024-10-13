import { ChangeEvent, FocusEvent } from "react";

import Input from "@components/Inputs/Input";
import Button from "@components/Inputs/Button";

interface JoinProps {
  error?: string;
  onSubmit: () => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Join({ error, onBlur, onChange, onSubmit }: JoinProps) {
  return (
    <form id="join" onSubmit={onSubmit}>
      <Input
        name="code"
        placeholder="Search By Name"
        onBlur={onBlur}
        onChange={onChange}
      />

      <Button type="submit" label="Join Quiz" />

      {error && <p>{error}</p>}
    </form>
  );
}
