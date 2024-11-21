"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import useAuth from "@hooks/authentication/useAuth";

import Logo from "@public/logo.png";

import styles from "./Navbar.module.scss";

interface NavbarProps {
  url?: string;
}

export default function Navbar({ url = "#" }: NavbarProps) {
  const { user, dispatch } = useAuth();
  const { replace } = useRouter();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    replace("/");
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <Link href={url}>
          <Image src={Logo} width={512} height={512} alt="logo" />
        </Link>

        <div>
          <span>/</span>
          <p>{user?.name}</p>
        </div>
      </div>

      <button onClick={handleLogout}>
        <p>Logout</p>
      </button>
    </nav>
  );
}
