import Image from "next/image";

import Copy from "@public/quiz/copy.svg";

import Button from "../Common/Button";

import styles from "./Details.module.scss";

interface DetailsProps {
  url: string;
}

export default function Details({ url }: DetailsProps) {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className={styles.details}>
      <div>
        <button type="submit" onClick={handleCopyToClipboard}>
          {url}
        </button>

        <Image
          src={Copy}
          height={512}
          width={512}
          alt="link"
          onClick={handleCopyToClipboard}
        />
      </div>

      <div>
        <Button icon="/quiz/edit.svg" label="Edit" onClick={() => {}} />
        <Button icon="/quiz/delete.svg" label="Delete" onClick={() => {}} />
      </div>
    </div>
  );
}
