import React, { useContext } from "react";
import { signOut } from "../../../firebase";
import { UserDataType, UserContext } from "../../../providers/user.provider";

// type ActiveUserType = {
//   user: UserDataType;
//   isUserSignedIn: Function;
// };

export const ActiveUser = (user: UserDataType) => {
  let setAuthState = useContext(UserContext).setAuthState;

  const handleSignOut = () => {
    setAuthState(prevState => {
      return { ...prevState, user: null, gardenId: " ", isLoggedIn: false };
    });
    signOut();
  };
  return (
    <>
      <div>WELCOME</div>
      {user && user.photoUrl ? (
        <img src={user.photoUrl} alt={`${user.displayName} Account Image`} />
      ) : null}
      <div>{user && user.displayName}</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};
