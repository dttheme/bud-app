import React, { useState, useContext } from "react";
import { signInWithGoogle } from "../../../firebase";
import { withRouter } from "react-router";
import { UserContext } from "../../../providers/user.provider";
import { PageHeading } from "../../atoms/page-header/page-header.component";

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
    <>
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
      <button onClick={handleGoogleSubmit}>Sign In With Google</button>
    </>
  );
});
