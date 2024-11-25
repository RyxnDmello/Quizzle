import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import getGroups from "@utils/getGroups";

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
  elementsPerGroup?: number;
}

export default function Pagination({
  url,
  image,
  page,
  total,
  elementsPerGroup,
  onSwitch,
}: PaginationProps) {
  const [group, setGroup] = useState<number>(0);

  const groups = getGroups(
    Array.from({ length: total }, (_, index) => index + 1),
    elementsPerGroup
  );

  const handleNext = () => setGroup((prev) => ++prev);
  const handlePrev = () => setGroup((prev) => --prev);

  return (
    <div className={`${styles.pagination} pagination`}>
      <div>
        {total > 1 && group > 0 && (
          <Image
            onClick={handlePrev}
            src={"/quiz/left.svg"}
            height={256}
            width={256}
            alt="prev"
          />
        )}

        {total > 1 &&
          groups[group].map((_) => (
            <Page
              onClick={() => onSwitch(_)}
              isSelected={_ === page}
              page={_}
              key={_}
            />
          ))}

        {total > 1 && group < groups.length - 1 && (
          <Image
            onClick={handleNext}
            src={"/quiz/right.svg"}
            height={256}
            width={256}
            alt="next"
          />
        )}
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
