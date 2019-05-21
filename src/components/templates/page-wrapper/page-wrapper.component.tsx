import React from "react";
import styles from "./page-wrapper.module.scss";

export const PageWrapper = props => {
  return <div className={styles.pageWrapper}>{props.children}</div>;
};
