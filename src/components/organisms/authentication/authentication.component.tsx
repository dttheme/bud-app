import React, { useContext, useEffect, useState } from "react";
import { SignUp } from "../../molecules/sign-up/sign-up";
import { SignIn } from "../../molecules/sign-in/sign-in";
import { ActiveUser } from "../../molecules/active-user/active-user.component";
import { UserContext } from "../../../providers/user.provider";
import { UserDataType } from "../../../providers/garden.provider";
import { User } from "firebase";

export const Authentication = () => {
  let user: any = useContext(UserContext).user;
  let loading: any = useContext(UserContext).isLoading;

  console.log(loading);
  if (user == null && loading) {
    return <div>Loading...</div>;
  }
  if (user == null && !loading) {
    return (
      <>
        <SignUp />
        <SignIn />
      </>
    );
  } else if (!loading && user !== null) {
    return <ActiveUser user={user} />;
  } else {
    return <div>Uh oh!</div>;
  }
};
