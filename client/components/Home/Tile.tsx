import { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

import styles from "./Tile.module.scss";

interface TileProps {
  image: string | StaticImageData;
  title: string;
  description: string;
}

export default function Tile({ image, title, description }: TileProps) {
  return (
    <Link href={"/register"} className={styles.tile} role="link">
      <Image src={image} width={10000} height={10000} alt="creator" />

      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <span></span>
    </Link>
  );
}
