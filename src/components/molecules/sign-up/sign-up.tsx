import React, { useState } from "react";

export const SignUp = () => {
  const [signUp, setSignUp] = useState({
    displayName: "",
    email: "",
    password: ""
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setSignUp({ [name]: value, ...signUp });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSignUp({ displayName: "", email: "", password: "" });
  };

  return (
    <form className="SignUp" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="displayName"
        placeholder="Display Name"
        value={signUp.displayName}
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
  );
};
