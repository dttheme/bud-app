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
import { Button } from "../../atoms/button/button.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { google } from "../../../utilities/font-awesome-library";

export const SignIn = withRouter(({ history }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const setAuthState = useContext(UserContext).setAuthState;
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleUserSubmit = event => {
    try {
      event.preventDefault();
      setUser({ email: "", password: "" });
      setAuthState(prevState => {
        return { ...prevState, isLoggedIn: true };
      });
      history.push("/garden");
    } catch (error) {
      setErrorMessage(error.message);
    }
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
          {errorMessage ? (
            <div className={styles.errorMessage}>{errorMessage}</div>
          ) : (
            ""
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Sign In</Button>
        </form>
        <Button className={styles.googleSignIn} onClick={handleGoogleSubmit}>
          Sign In With{" "}
          <FontAwesomeIcon icon={google} className={styles.googleIcon} />
          Google
        </Button>
        <p>
          Don't have an account?{" "}
          <Link to="/signin" style={{ color: "green" }}>
            Sign up.
          </Link>
        </p>
      </ContentWrapper>
    </PageWrapper>
  );
});
