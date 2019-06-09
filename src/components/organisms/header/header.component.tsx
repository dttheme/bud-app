import React, { useContext } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../../providers/user.provider";
import { Weather } from "../weather/weather.component";
import { Authentication } from "../authentication/authentication.component";
import { LinkWrapper } from "../../atoms/link-wrapper/link-wrapper.component";

const AuthenticatedLinks = ({ endpoint, toolipText, ariaLabel, content }) => (
  <Link
    to={endpoint}
    style={{ textDecoration: "none" }}
    className={styles.authLink}
  >
    <span aria-label={ariaLabel}>
      <LinkWrapper>{content}</LinkWrapper>
    </span>
  </Link>
);

export const Header = () => {
  const user = useContext(UserContext).user;
  return (
    <header className={styles.header}>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center"
        }}
      >
        <img
          src="images/icon.png"
          alt="A sprout"
          className={styles.sproutIcon}
        />
        <h1>Sprout Bud</h1>
      </Link>
      <Authentication />
      <Weather />
      {user !== null ? (
        // <div>
        <span className={styles.headerLinks}>
          {/* <AuthenticatedLinks
            endpoint="/add-plant"
            toolipText="Add Plant"
            ariaLabel="Add a plant"
            content="Add a Plant"
          /> */}
          <AuthenticatedLinks
            endpoint="/garden"
            toolipText="Garden"
            ariaLabel="Go to garden"
            content="Garden"
          />
          <hr />
          <AuthenticatedLinks
            endpoint="/account"
            toolipText="Account"
            ariaLabel="Go to account"
            content="Account"
          />
        </span>
      ) : null}
    </header>
  );
};
