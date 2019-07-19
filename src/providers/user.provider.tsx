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
  photoURL?: string;
};

export type AuthStateType = {
  user: UserDataType | null;
  gardenId: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  setAuthState: React.Dispatch<
    React.SetStateAction<{
      user: null;
      gardenId: string;
      isLoading: boolean;
      isLoggedIn: boolean;
    }>
  >;
};

export const UserContext = createContext({} as AuthStateType);

export let unsubscribeFromAuth: any = null;
export const UserProvider = props => {
  const [authentication, setAuthState] = useState({
    user: null,
    gardenId: " ",
    isLoading: false,
    isLoggedIn: false
  });

  // on mount, subscribe to any user data
  useEffect(() => {
    let userRef;
    unsubscribeFromAuth = auth.onAuthStateChanged(async authState => {
      setAuthState(prevState => {
        console.log("Loading...");
        return { isLoading: true, ...prevState };
      });
      console.log(authentication);
      if (authState) {
        userRef = await createUserProfileDocument(authState);
        userRef.onSnapshot(snapshot => {
          setAuthState({
            user: {
              uid: snapshot.id,
              ...snapshot.data()
            },
            gardenId: snapshot.id,
            isLoading: false,
            isLoggedIn: true
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

  // console.log(authentication);
  return (
    <UserContext.Provider value={{ setAuthState, ...authentication }}>
      {props.children}
    </UserContext.Provider>
  );
};
