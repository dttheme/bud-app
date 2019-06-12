import React, { useState } from "react";
import styles from "./error.module.scss";

export const ErrorBoundary = ({ children, message }) => {
  const [visible, setVisibility] = useState(false);
  const handleError = (message = "Something went wrong...") => {
    message = message;
    setVisibility(true);
    setTimeout(() => {
      setVisibility(false);
    }, 3000);
  };
  return (
    <div className={styles.errorBoundary}>
      <div className={`${visible ? styles.show : ""}`} />
      <div>{children}</div>
    </div>
  );
};
