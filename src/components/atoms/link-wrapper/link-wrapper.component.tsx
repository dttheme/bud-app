import React from "react";
import styles from "./link-wrapper.module.scss";

export const LinkWrapper = ({ href, children }) => (
  <a className={styles.linkWrapper} href={href}>
    {children}
  </a>
);
