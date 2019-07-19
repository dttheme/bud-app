import React, { useContext } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../../providers/user.provider";
import { Weather } from "../weather/weather.component";
import { Authentication } from "../authentication/authentication.component";
import { LinkWrapper } from "../../atoms/link-wrapper/link-wrapper.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../atoms/button/button.component";

const AuthenticatedLinks = ({ endpoint, toolipText, ariaLabel, content }) => (
  <Link
    to={endpoint}
    style={{ textDecoration: "none" }}
    className={styles.authLink}
  >
    <Button aria-label={ariaLabel}>{content}</Button>
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
      <p className={styles.headerAlert}>
        <FontAwesomeIcon icon={"exclamation-circle"} /> Sprout Bud is still in
        development! Please visit my{" "}
        <LinkWrapper href="https://trello.com/b/7ciW8leI/bud-app">
          Trello
        </LinkWrapper>{" "}
        for this project to see what's being developed next!
      </p>
      <Authentication />
      {/* <Weather /> */}
      {user !== null ? (
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
