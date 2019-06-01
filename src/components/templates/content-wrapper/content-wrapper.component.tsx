import React from "react";
import styles from "./content-wrapper.module.scss";

export const ContentWrapper = ({ children }) => {
  return <div className={styles.contentWrapper}>{children}</div>;
};
