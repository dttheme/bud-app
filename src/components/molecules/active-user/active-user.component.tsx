import React from "react";
import { signOut } from "../../../firebase";
import { UserDataType } from "../../../providers/user.provider";

type ActiveUserType = {
  user: UserDataType;
  // isUserSignedIn?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ActiveUser = ({ user }: ActiveUserType) => {
  // user !== null ? ({ uid, displayName, email } = user) : null;
  // const handleSignOut = () => {
  //   isUserSignedIn && isUserSignedIn(false);
  //   signOut();
  // };
  return (
    <>
      <div>WELCOME</div>
      <button onClick={signOut}>Sign Out</button>
      <div>{user && user.displayName}</div>
      {/* <div>{email}</div>
      <div>{uid}</div> */}
    </>
  );
};
