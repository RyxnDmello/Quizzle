import Image from "next/image";

import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  icon: string;
  onClick: () => void;
}

export default function Button({ label, icon, onClick }: ButtonProps) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      <Image src={icon} width={512} height={512} alt="icon" />
      <p>{label}</p>
    </button>
  );
}
