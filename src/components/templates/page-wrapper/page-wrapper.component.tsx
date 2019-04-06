import React from "react";
import styles from "./page-wrapper.module.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "../../molecules/tooltip/tooltip.component";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={`${styles.navLink} ${styles.navText}`}>
          <h1>Plant Bud</h1>
        </Link>
        <span>
          <Link to="/add-plant" className={styles.navText}>
            <Tooltip text="Add Plant">
              <span aria-label="add">➕</span>
            </Tooltip>
          </Link>
          <Link to="/garden" className={styles.navText}>
            <Tooltip text="Garden">
              <span aria-label="garden">🌱</span>
            </Tooltip>
          </Link>
        </span>
      </header>
      <div className={styles.pageWrapper}>{children}</div>
    </>
  );
};
