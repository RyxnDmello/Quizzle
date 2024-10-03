import Image from "next/image";
import Link from "next/link";

import Logo from "@public/logo.png";

import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/creator">
        <Image src={Logo} width={512} height={512} alt="logo" />
      </Link>

      <div>
        <span>/</span>
        <p>Ryan Nolasco D Mello</p>
      </div>
    </nav>
  );
}
