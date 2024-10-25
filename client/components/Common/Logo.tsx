import Image from "next/image";

import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <div className={`logo ${styles.logo}`}>
      <Image src={"/logo.png"} width={512} height={512} alt="" />
      <h4>QUIZ<span>ZLE</span></h4>
    </div>
  );
}
