import React, { useContext } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "../../atoms/tooltip/tooltip.component";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper.component";
import { Authentication } from "../authentication/authentication.component";
import { UserContext } from "../../../providers/user.provider";
import { LinkWrapper } from "../../atoms/link-wrapper/link-wrapper.component";

const AuthenticatedLinks = ({ endpoint, toolipText, ariaLabel, content }) => (
  <Link
    to={endpoint}
    style={{ textDecoration: "none" }}
    className={styles.authLink}
  >
    <LinkWrapper>
      <span aria-label={ariaLabel}>{content}</span>
    </LinkWrapper>
  </Link>
);

export const Header = () => {
  const user = useContext(UserContext).user;
  return (
    <header className={styles.header}>
      <Link to="/" className={``} style={{ textDecoration: "none" }}>
        <h1>Sprout Bud</h1>
      </Link>
      {user !== null ? (
        <span>
          <AuthenticatedLinks
            endpoint="/add-plant"
            toolipText="Add Plant"
            ariaLabel="Add a plant"
            content="Add a Plant"
          />
          <AuthenticatedLinks
            endpoint="/garden"
            toolipText="Garden"
            ariaLabel="Go to garden"
            content="Garden"
          />
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
