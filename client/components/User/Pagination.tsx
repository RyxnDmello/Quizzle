import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Page from "./Pagination/Page";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  pages: number;
}

export default function Pagination({ pages }: PaginationProps) {
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

      <Link href={"/creator/quiz/create"}>
        <Image src={"/user/add.svg"} width={512} height={512} alt="add" />
        <p>Create Quiz</p>
      </Link>
    </div>
  );
}
