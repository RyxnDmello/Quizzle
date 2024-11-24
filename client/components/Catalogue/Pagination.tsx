import Image from "next/image";
import Link from "next/link";

import Page from "./Pagination/Page";

import styles from "./Pagination.module.scss";

interface PaginationProps extends ButtonProps {
  total: number;
  page: number;
  onSwitch: (page: number) => void;
}

interface ButtonProps {
  url?: string;
  image?: string;
}

export default function Pagination({
  url,
  image,
  page,
  total,
  onSwitch,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <div>
        {total > 1 &&
          Array.from({ length: total }, (_, i) => (
            <Page
              onClick={() => onSwitch(i + 1)}
              isSelected={page === i + 1}
              page={i + 1}
              key={i}
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
