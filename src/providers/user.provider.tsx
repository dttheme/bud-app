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
} | null;

export type AuthStateType = {
  user: UserDataType;
  gardenId?: string;
};

export const UserContext = createContext({} as AuthStateType);

export let unsubscribeFromAuth: any = null;
export const UserProvider = props => {
  const [authentication, setAuthState] = useState({
    user: null,
    gardenId: " "
  });

  useEffect(() => {
    let userRef;
    unsubscribeFromAuth = auth.onAuthStateChanged(async authState => {
      console.log(authState);
      if (authState) {
        userRef = await createUserProfileDocument(authState);
        userRef.onSnapshot(snapshot => {
          setAuthState({
            user: {
              uid: snapshot.id,
              ...snapshot.data()
            },
            gardenId: snapshot.id
          });
        });
        setAuthState({
          user: userRef,
          gardenId: userRef && userRef.id ? userRef.id : " "
        });
      }
    });
    return () => unsubscribeFromAuth();
  }, []);
  console.log(authentication);
  return (
    <UserContext.Provider value={authentication}>
      {props.children}
    </UserContext.Provider>
  );
};
