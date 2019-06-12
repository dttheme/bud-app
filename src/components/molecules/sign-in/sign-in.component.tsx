import React, { useContext, useState } from "react";
import styles from "./sign-in.module.scss";
import { ContentWrapper } from "../../templates/content-wrapper/content-wrapper.component";
import { Link } from "react-router-dom";
import { PageHeading } from "../../atoms/page-header/page-header.component";
import {
  PageWrapper,
  pottedHerbs
} from "../../templates/page-wrapper/page-wrapper.component";
import { signInWithGoogle } from "../../../firebase";
import { UserContext } from "../../../providers/user.provider";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "../../atoms/button/button.component";
library.add(faGoogle);
const google = icon({ prefix: "fab", iconName: "google" });

export const SignIn = withRouter(({ history }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const setAuthState = useContext(UserContext).setAuthState;

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleUserSubmit = event => {
    event.preventDefault();
    setUser({ email: "", password: "" });
    setAuthState(prevState => {
      return { ...prevState, isLoggedIn: true };
    });
    history.push("/garden");
  };

  const handleGoogleSubmit = async () => {
    await signInWithGoogle();
    await setAuthState(prevState => {
      return { ...prevState, isLoggedIn: true };
    });
    history.push("/garden");
  };

  return (
    <PageWrapper backgroundImage={pottedHerbs}>
      <ContentWrapper>
        <form onSubmit={handleUserSubmit}>
          <PageHeading title="Sign In" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          <Button type="submit">SignIn</Button>
        </form>
        <Button className={styles.googleSignIn} onClick={handleGoogleSubmit}>
          Sign In With{" "}
          <FontAwesomeIcon icon={google} className={styles.googleIcon} />
          Google
        </Button>
        <div>
          Don't have an account?{" "}
          <Link to="/signin" style={{ color: "green" }}>
            Sign up.
          </Link>
        </div>
      </ContentWrapper>
    </PageWrapper>
  );
});
