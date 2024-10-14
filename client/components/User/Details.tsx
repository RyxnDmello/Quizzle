import Image from "next/image";

import Button from "../Common/Button";

import styles from "./Details.module.scss";

interface DetailsProps {
  code: string;
}

export default function Details({ code }: DetailsProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://www.quizzle.com/quiz/${code}`);
  };

  return (
    <div className={styles.details}>
      <div>
        <button type="submit" onClick={copyToClipboard}>
          <span>https://www.quizzle.com/quiz/</span>
          {code}
        </button>

        <Image
          src={"/quiz/copy.svg"}
          alt="link"
          width={512}
          height={512}
          onClick={copyToClipboard}
        />
      </div>

      <div>
        <Button icon="/quiz/edit.svg" label="Edit" onClick={() => {}} />
        <Button icon="/quiz/delete.svg" label="Delete" onClick={() => {}} />
      </div>
    </div>
  );
}
