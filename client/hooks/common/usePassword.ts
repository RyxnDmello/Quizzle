import { useState } from "react";
import { StaticImageData } from "next/image";

import Reveal from "@public/auth/reveal.svg";
import Hide from "@public/auth/hide.svg";

export default function usePassword() {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const typeable: string = isHidden ? "text" : "password";
  const icon: StaticImageData = isHidden ? Reveal : Hide;

  const handleToggle = () => setIsHidden((prev) => !prev);

  return { typeable, icon, handleToggle };
}
