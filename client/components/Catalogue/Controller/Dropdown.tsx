import { PropsWithChildren, ChangeEvent } from "react";

import styles from "./Dropdown.module.scss";

interface DropdownProps extends PropsWithChildren {
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({ children, name, onChange }: DropdownProps) {
  return (
    <select className={styles.dropdown} name={name} onChange={onChange}>
      {children}
    </select>
  );
}
