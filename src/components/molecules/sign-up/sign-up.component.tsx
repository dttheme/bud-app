import React, { useState } from "react";
import { auth, createUserProfileDocument } from "../../../firebase";
import { withRouter } from "react-router";
import { PageHeading } from "../../atoms/page-header/page-header.component";
import styles from "./sign-up.module.scss";
import { PageWrapper } from "../../templates/page-wrapper/page-wrapper.component";

export const SignUp = withRouter(({ history }) => {
  const [signUp, setSignUp] = useState({
    display_name: "",
    email: "",
    password: ""
  });

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

      createUserProfileDocument(user, { displayName: signUp.display_name });
      console.log(signUp.display_name);
    } catch (error) {
      console.log(error);
      // callback function here to display login error component
      // code: 'auth/invalid-email'
    }
    setSignUp({
      display_name: "",
      email: "",
      password: ""
    });
    await history.push("/add-plant");
    console.log("success!");
  };

  return (
    <PageWrapper>
      <div className={styles.signup}>
        <form onSubmit={handleSubmit}>
          <PageHeading title="Sign Up" />
          <input
            type="text"
            name="display_name"
            placeholder="Display Name"
            value={signUp.display_name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUp.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signUp.password}
            onChange={handleChange}
          />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </PageWrapper>
  );
});
