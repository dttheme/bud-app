import React, { useContext } from "react";
import { signOut } from "../../../firebase";
import { UserDataType, UserContext } from "../../../providers/user.provider";
import styles from "./active-user.module.scss";
import { Button } from "../../atoms/button/button.component";

export const ActiveUser = (user: UserDataType) => {
  let setAuthState = useContext(UserContext).setAuthState;

  const handleSignOut = () => {
    setAuthState(prevState => {
      return { ...prevState, user: null, gardenId: " ", isLoggedIn: false };
    });
    signOut();
  };
  return (
    <div className={styles.activeUserWrapper}>
      <div className={styles.activeUserContent}>
        {user && user.photoURL ? (
          <div className={styles.activeUserImageWrapper}>
            <img
              src={user.photoURL}
              className={styles.activeUserImage}
              alt={`${user.displayName} Account Image`}
            />
          </div>
        ) : null}
        <div className={styles.displayName}>{user && user.displayName}</div>
      </div>
      <Button
        className={styles.signOutButton}
        onClick={handleSignOut}
        size="small"
      >
        Sign Out
      </Button>
    </div>
  );
};
