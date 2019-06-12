import React, { useContext } from "react";
import { ActiveUser } from "../../molecules/active-user/active-user.component";
import { Link } from "react-router-dom";
import { LinkWrapper } from "../../atoms/link-wrapper/link-wrapper.component";
import { UserContext, UserDataType } from "../../../providers/user.provider";
import styles from "./authentication.module.scss";
import { Button } from "../../atoms/button/button.component";

export const Authentication = () => {
  let user = useContext(UserContext).user;
  let loggedIn = useContext(UserContext).isLoggedIn;
  let loading = useContext(UserContext).isLoading;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loggedIn && !loading) {
    return (
      <div className={styles.signWrapper}>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button>Sign Up</Button>
        </Link>
        <hr />
        <Link to="/signin" style={{ textDecoration: "none" }}>
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  } else if (!loading && loggedIn) {
    return <ActiveUser {...user as UserDataType} />;
  } else {
    return <div>Uh oh!</div>;
  }
};
