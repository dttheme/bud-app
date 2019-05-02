import React, { useContext } from "react";
import { SignUp } from "../../molecules/sign-up/sign-up";
import { SignIn } from "../../molecules/sign-in/sign-in";
import { ActiveUser } from "../../molecules/active-user/active-user.component";
import { UserContext } from "../../../providers/user.provider";
import { UserDataType } from "../../../providers/garden.provider";

export const Authentication = () => {
  const user: UserDataType | null = useContext(UserContext).user;
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
