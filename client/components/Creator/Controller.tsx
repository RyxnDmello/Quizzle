import Search from "@components/Common/Search";

import styles from "./Controller.module.scss";

interface ControllerProps {
  onChange: (prompt: string) => void;
}

export default function Controller({ onChange }: ControllerProps) {
  return (
    <form className={styles.controller}>
      <Search placeholder="Search By Name..." onChange={onChange} />
      <div></div>
    </form>
  );
}
