import React, { useContext, useEffect, useState } from "react";
import { SignUp } from "../../molecules/sign-up/sign-up";
import { SignIn } from "../../molecules/sign-in/sign-in";
import { ActiveUser } from "../../molecules/active-user/active-user.component";
import { UserContext, UserDataType } from "../../../providers/user.provider";

export const Authentication = () => {
  let user = useContext(UserContext).user;
  let loggedIn = useContext(UserContext).isLoggedIn;
  let loading = useContext(UserContext).isLoading;

  if (loggedIn && loading) {
    return <div>Loading...</div>;
  }
  if (!loggedIn && !loading) {
    return (
      <>
        <SignUp />
        <SignIn />
      </>
    );
  } else if (!loading && loggedIn) {
    return <ActiveUser {...user as UserDataType} />;
  } else {
    return <div>Uh oh!</div>;
  }
};
