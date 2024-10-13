import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Page from "./Pagination/Page";

import styles from "./Pagination.module.scss";

interface PaginationProps extends ButtonProps {
  pages: number;
}

interface ButtonProps {
  url?: string;
  image?: string;
}

export default function Pagination({ url, image, pages }: PaginationProps) {
  const [page, setPage] = useState<number>(0);

  return (
    <div className={styles.pagination}>
      <div>
        {Array.from({ length: pages }, (_, i) => (
          <Page
            key={i}
            page={i + 1}
            isSelected={page === i}
            onClick={() => setPage(i)}
          />
        ))}
      </div>

      {url && <Button url={url} image={image} />}
    </div>
  );
}

function Button({ url, image }: ButtonProps) {
  return (
    <Link href={url!}>
      <Image src={image!} width={512} height={512} alt="add" />
      <p>Create Quiz</p>
    </Link>
  );
}
