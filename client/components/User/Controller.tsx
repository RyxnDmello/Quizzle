import Search from "@components/Common/Search";

import styles from "./Controller.module.scss";

interface ControllerProps {
  onChange: (prompt: string) => void;
}

export default function Controller({ onChange }: ControllerProps) {
  return (
    <form className={styles.controller} onSubmit={() => {}}>
      <Search placeholder="Search By Name..." onChange={onChange} />

      <select name="sort">
        <option value="name_asc">Name (Ascending)</option>
        <option value="name_desc">Name (Descending)</option>
        <option value="questions_asc">Questions (Ascending)</option>
        <option value="questions_desc">Questions (Descending)</option>
        <option value="points_asc">Points (Ascending)</option>
        <option value="points_desc">Points (Descending)</option>
      </select>
    </form>
  );
}
