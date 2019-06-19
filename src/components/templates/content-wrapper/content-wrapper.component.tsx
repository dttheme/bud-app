import React, { ReactNode } from "react";
import styles from "./content-wrapper.module.scss";

export const ContentWrapper = ({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} ${styles.contentWrapper}`}>{children}</div>
  );
};
