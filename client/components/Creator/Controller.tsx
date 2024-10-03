import styles from "./Controller.module.scss";

export default function Controller() {
  return (
    <form className={styles.controller}>
      <input type="text" placeholder="Search By Name..." />
      <div></div>
    </form>
  );
}
