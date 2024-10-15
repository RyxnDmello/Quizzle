import Image from "next/image";

import styles from "./Code.module.scss";

interface CodeProps {
  code: string;
}

export default function Code({ code }: CodeProps) {
  const handleClipboard = () => {
    navigator.clipboard.writeText(`https://www.quizzle.com/quiz/${code}`);
  };

  return (
    <div className={styles.code}>
      <button type="submit" onClick={handleClipboard}>
        <span>https://www.quizzle.com/quiz/</span>
        {code}
      </button>

      <Image
        src={"/quiz/copy.svg"}
        alt="link"
        width={512}
        height={512}
        onClick={handleClipboard}
      />
    </div>
  );
}
