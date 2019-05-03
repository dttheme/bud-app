import React, { createContext, useEffect, useState } from "react";
import { collectIdsAndDocs } from "../components/templates/app-wrapper/app-wrapper.component";
import { firestore, auth, createUserProfileDocument } from "../firebase";
import { Authentication } from "../components/organisms/authentication/authentication.component";

export type PlantDataType = {
  slug: string;
  common_name: string;
  scientific_name: string;
  id: string;
};

export type UserDataType = {
  uid: string;
  displayName: string;
  email: string;
};

export type AuthStateType = {
  user: UserDataType | null;
  gardenId: string;
  isLoading: boolean;
};

export const UserContext = createContext({} as AuthStateType);

export let unsubscribeFromAuth: any = null;
export const UserProvider = props => {
  const [authentication, setAuthState] = useState({
    user: null,
    gardenId: " ",
    isLoading: false
  });

  // on mount, subscribe to any user data
  useEffect(() => {
    let userRef;
    unsubscribeFromAuth = auth.onAuthStateChanged(async authState => {
      console.log(authState);
      if (authState) {
        setAuthState(prevState => {
          return { isLoading: true, ...prevState };
        });
        userRef = await createUserProfileDocument(authState);
        userRef.onSnapshot(snapshot => {
          setAuthState({
            user: {
              uid: snapshot.id,
              ...snapshot.data()
            },
            gardenId: snapshot.id,
            isLoading: false
          });
        });
      }
    });
    return () =>
      unsubscribeFromAuth() &&
      setAuthState(prevState => {
        return { ...prevState, isLoading: false };
      });
  }, []);

  // useEffect(() => {
  //   return () =>
  //     unsubscribeFromAuth() &&
  //     setAuthState({ isLoading: false, user: null, gardenId: " " });
  // }, []);

  console.log(authentication);
  return (
    <UserContext.Provider value={authentication}>
      {props.children}
    </UserContext.Provider>
  );
};
