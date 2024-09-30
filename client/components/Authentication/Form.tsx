"use client";

import Input from "./Input";

import Button from "./Button";
import styles from "./Form.module.scss";

export default function Form() {
  return (
    <form className={styles.form} onSubmit={() => {}}>
      <Input type="text" name="Name" label="Name" placeholder="Nathan Drake" />

      <Input
        type="email"
        name="Email"
        label="Email"
        placeholder="nathan@domain.com"
      />

      <Input
        type="number"
        name="Mobile"
        label="Mobile"
        placeholder="9876543210"
      />

      <Input
        type="password"
        name="Password"
        label="Password"
        placeholder="••••••••"
      />

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="••••••••"
      />

      <Button label="Create An Account" />
    </form>
  );
}
