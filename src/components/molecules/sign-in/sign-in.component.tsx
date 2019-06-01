import React, { useState, useContext } from "react";
import { signInWithGoogle } from "../../../firebase";
import { withRouter } from "react-router";
import { UserContext } from "../../../providers/user.provider";
import { PageHeading } from "../../atoms/page-header/page-header.component";
import styles from "./sign-in.module.scss";
import { PageWrapper } from "../../templates/page-wrapper/page-wrapper.component";
import { ContentWrapper } from "../../templates/content-wrapper/content-wrapper.component";
import { Link } from "react-router-dom";

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
    <PageWrapper>
      <ContentWrapper>
        <form className="SignIn" onSubmit={handleUserSubmit}>
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
          <input type="submit" value="Sign In" />
        </form>
        <button className={styles.googleSignIn} onClick={handleGoogleSubmit}>
          Sign In With Google
        </button>
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
