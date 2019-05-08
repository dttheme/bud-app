import React, { useContext } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "../../atoms/tooltip/tooltip.component";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper.component";
import { Authentication } from "../authentication/authentication.component";
import { UserContext } from "../../../providers/user.provider";

const LoggedInIcon = ({ endpoint, toolipText, ariaLabel, icon }) => (
  <Link to={endpoint} className={styles.navText}>
    <Tooltip text={toolipText}>
      <IconWrapper ariaLabel={ariaLabel} className={styles.headerIcon}>
        <span aria-label="add">{icon}</span>
      </IconWrapper>
    </Tooltip>
  </Link>
);

export const Header = () => {
  const user = useContext(UserContext).user;
  return (
    <header className={styles.header}>
      <Link to="/" className={`${styles.navLink} ${styles.navText}`}>
        <h1>Bud</h1>
      </Link>
      {user !== null ? (
        <span>
          <LoggedInIcon
            endpoint="/add-plant"
            toolipText="Add Plant"
            ariaLabel="Add a plant"
            icon={"➕"}
          />
          <LoggedInIcon
            endpoint="/garden"
            toolipText="Garden"
            ariaLabel="Go to garden"
            icon={"🌱"}
          />
          <LoggedInIcon
            endpoint="/account"
            toolipText="Account"
            ariaLabel="Go to account"
            icon={"👤"}
          />
        </span>
      ) : null}
      <Authentication />
    </header>
  );
};
