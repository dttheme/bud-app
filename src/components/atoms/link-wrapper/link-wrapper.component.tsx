import React from "react";
import styles from "./link-wrapper.module.scss";

export const LinkWrapper = props => (
  <div className={styles.linkWrapper}>{props.children}</div>
);
