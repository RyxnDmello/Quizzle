import Image, { StaticImageData } from "next/image";

import styles from "./Text.module.scss";

interface InputProps {
  label: string | number;
  icon?: StaticImageData | string;
}

export default function Text({ icon, label }: InputProps) {
  return (
    <div className={`${styles.text} ${icon && styles.icon}`}>
      {icon && <Image src={icon} width={512} height={512} alt="icon" />}
      <p>{label}</p>
    </div>
  );
}
