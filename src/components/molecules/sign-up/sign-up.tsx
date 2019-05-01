import React, { useState } from "react";
import { auth, createUserProfileDocument } from "../../../firebase";

export const SignUp = () => {
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

      createUserProfileDocument(user, signUp.display_name);
    } catch (error) {
      console.log(error);
    }
    setSignUp({ display_name: "", email: "", password: "" });
  };

  return (
    <form className="SignUp" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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
  );
};
