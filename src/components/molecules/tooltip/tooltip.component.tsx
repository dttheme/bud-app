import React from "react";
import styles from "./tooltip.module.scss";

export const Tooltip = ({
  children,
  text
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipText}>{text}</span>
      {children}
    </div>
  );
};
