import React from "react";
import styles from "./tile-entry.module.scss";

export const TileEntry = ({ valueTitle, value }) => (
  <div className={styles.tileEntry}>
    <span className={styles.entryTitle}>{valueTitle}</span>:&nbsp;
    <span className={styles.entryValue}>{value}</span>
  </div>
);
