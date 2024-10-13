import { PropsWithChildren } from "react";

import styles from "./Controller.module.scss";

interface ControllerProps extends PropsWithChildren {
  onSubmit: () => void;
}

export default function Controller({ children, onSubmit }: ControllerProps) {
  return (
    <form className={styles.controller} action={"/"} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
