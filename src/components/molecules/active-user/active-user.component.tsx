import React from "react";
import { signOut } from "../../../firebase";

export const ActiveUser = ({ uid, displayName, email }) => {
  return (
    <>
      <div>WELCOME</div>
      <button onClick={signOut}>Sign Out</button>
      <div>{displayName}</div>
      <div>{email}</div>
      <div>{uid}</div>
    </>
  );
};
