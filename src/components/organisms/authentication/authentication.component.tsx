import React from "react";
import { SignUp } from "../../molecules/sign-up/sign-up";
import { SignIn } from "../../molecules/sign-in/sign-in";
import { ActiveUser } from "../../molecules/active-user/active-user.component";

export const Authentication = ({ user }) => {
  console.log(user);
  return (
    <>
      {user ? (
        <ActiveUser {...user} />
      ) : (
        <>
          <SignUp />
          <SignIn />
        </>
      )}
    </>
  );
};
