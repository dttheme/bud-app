import React from "react";
import styles from "./page-header.module.scss";

export const PageHeading = ({ title }) => (
  <div className={styles.pageHeading}>{title}</div>
);
