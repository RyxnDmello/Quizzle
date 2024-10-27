"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

import { USER } from "@interfaces/User";

import styles from "./Tile.module.scss";

interface TileProps {
  type: USER;
  image: string | StaticImageData;
  title: string;
  description: string;
}

export default function Tile({ type, image, title, description }: TileProps) {
  const handleClick = () => {
    localStorage.setItem("USER", type);
  };

  return (
    <Link href={"/register"} className={styles.tile} role="link" onClick={handleClick}>
      <Image src={image} width={10000} height={10000} alt="creator" />

      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <span></span>
    </Link>
  );
}
