import Image from "next/image";
import Link from "next/link";

import Logo from "@public/logo.png";

import styles from "./Navbar.module.scss";

interface NavbarProps {
  url?: string;
  name: string;
}

export default function Navbar({ url = "#", name }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <Link href={url}>
        <Image src={Logo} width={512} height={512} alt="logo" />
      </Link>

      <div>
        <span>/</span>
        <p>{name}</p>
      </div>
    </nav>
  );
}
