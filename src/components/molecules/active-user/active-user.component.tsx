import React from "react";
import { signOut } from "../../../firebase";

export const ActiveUser = props => {
  console.log(props);
  return (
    <>
      <div>WELCOME</div>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};
