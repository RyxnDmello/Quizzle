import Image from "next/image";

import Icon from "@public/quiz/add.svg";

import styles from "./Add.module.scss";

interface AddProps {
  onAdd: () => void;
}

export default function Add({ onAdd }: AddProps) {
  return (
    <button className={styles.button} type="button" onClick={onAdd}>
      <Image src={Icon} height={512} width={512} alt="icon" />
      <p>Add Question</p>
    </button>
  );
}
