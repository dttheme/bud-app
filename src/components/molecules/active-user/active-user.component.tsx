import React from "react";
import { signOut } from "../../../firebase";
import { UserDataType } from "../../../providers/user.provider";

type ActiveUserType = {
  user: UserDataType;
  // isUserSignedIn?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ActiveUser = ({ user }: ActiveUserType) => {
  const { uid, displayName, email } = user;
  // const handleSignOut = () => {
  //   isUserSignedIn && isUserSignedIn(false);
  //   signOut();
  // };
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
