import Link from "next/link";

import styles from "./Empty.module.scss";

interface EmptyProps {
  url?: string;
  label?: string;
  reason: string;
}

export default function Empty({ url, reason, label }: EmptyProps) {
  return (
    <div className={styles.empty}>
      <p>{reason}</p>
      {url && <Link href={url}>{label}</Link>}
    </div>
  );
}
