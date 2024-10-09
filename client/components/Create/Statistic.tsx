import Image, { StaticImageData } from "next/image";

import styles from "./Statistic.module.scss";

interface StatisticProps {
  icon: StaticImageData;
  value: string;
}

export default function Statistic({ icon, value }: StatisticProps) {
  return (
    <div className={styles.statistic}>
      <Image src={icon} width={512} height={512} alt="icon" />
      <p>{value}</p>
    </div>
  );
}
