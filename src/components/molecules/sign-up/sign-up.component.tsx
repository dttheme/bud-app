import React, { useState } from "react";
import { auth, createUserProfileDocument } from "../../../firebase";
import { withRouter } from "react-router";
import { PageHeading } from "../../atoms/page-header/page-header.component";
import styles from "./sign-up.module.scss";
import {
  PageWrapper,
  elephantEar
} from "../../templates/page-wrapper/page-wrapper.component";
import { ContentWrapper } from "../../templates/content-wrapper/content-wrapper.component";
import { Link } from "react-router-dom";
// import { ErrorBoundary } from "../../templates/error/error.component";

export const SignUp = withRouter(({ history }) => {
  const [signUp, setSignUp] = useState({
    display_name: "",
    email: "",
    password: "",
    zipCode: ""
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleChange = event => {
    const { name, value } = event.target;
    setSignUp({ ...signUp, [name]: value });
    console.log(signUp);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        signUp.email,
        signUp.password
      );

      createUserProfileDocument(user, {
        displayName: signUp.display_name,
        zipCode: signUp.zipCode
      });
      await history.push("/add-plant");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setSignUp({
      display_name: "",
      email: "",
      password: "",
      zipCode: ""
    });
  };

  return (
    <PageWrapper backgroundImage={elephantEar}>
      <ContentWrapper className={styles.signUp}>
        <form onSubmit={handleSubmit}>
          <PageHeading title="Sign Up" />
          {errorMessage ? (
            <div className={styles.errorMessage}>{errorMessage}</div>
          ) : (
            ""
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUp.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signUp.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="display_name"
            placeholder="Display Name"
            value={signUp.display_name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="zipCode"
            placeholder="Zip Code"
            value={signUp.zipCode}
            onChange={handleChange}
          />
          <input type="submit" value="Sign Up" />
        </form>
        <p>
          Got a Google account?{" "}
          <Link to="/signin" style={{ color: "green" }}>
            Sign in.
          </Link>
        </p>
      </ContentWrapper>
    </PageWrapper>
  );
});
