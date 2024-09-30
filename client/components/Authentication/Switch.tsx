import Link from "next/link";

import styles from "./Switch.module.scss";

interface SwitchProps {
  url: string;
  label: string;
  reason: string;
}

export default function Switch({ url, label, reason }: SwitchProps) {
  return (
    <div className={styles.switch}>
      <p>{reason}</p>
      <Link href={url}>{label}</Link>
    </div>
  );
}
