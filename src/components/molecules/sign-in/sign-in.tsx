import React, { useState } from "react";
import { signInWithGoogle } from "../../../firebase";

export const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ [name]: value, ...user });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUser({ email: "", password: "" });
  };

  return (
    <form className="SignIn" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
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
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </form>
  );
};
