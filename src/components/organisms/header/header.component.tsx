import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "../../atoms/tooltip/tooltip.component";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper.component";
import { Authentication } from "../authentication/authentication.component";
import { AppContext } from "../../templates/app-wrapper/app-wrapper.component";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={`${styles.navLink} ${styles.navText}`}>
        <h1>Plant Bud</h1>
      </Link>
      <span>
        <Link to="/add-plant" className={styles.navText}>
          <Tooltip text="Add Plant">
            <IconWrapper ariaLabel="Add a plant" className={styles.headerIcon}>
              <span aria-label="add">➕</span>
            </IconWrapper>
          </Tooltip>
        </Link>
        <Link to="/garden" className={styles.navText}>
          <Tooltip text="Garden">
            <IconWrapper
              ariaLabel="Go to your garden"
              className={styles.headerIcon}
            >
              <span aria-label="garden">🌱</span>
            </IconWrapper>
          </Tooltip>
        </Link>
      </span>
      <AppContext.Consumer>
        {state => <Authentication user={state.user} />}
      </AppContext.Consumer>
    </header>
  );
};
