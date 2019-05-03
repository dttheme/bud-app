import React, { useContext } from "react";
import styles from "./app-wrapper.module.scss";
import { Header } from "../../organisms/header/header.component";
import { GardenProvider } from "../../../providers/garden.provider";
import { UserProvider, UserContext } from "../../../providers/user.provider";
import { Authentication } from "../../organisms/authentication/authentication.component";

type AppWrapperType = {
  children: React.ReactNode;
};

export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

export const AppWrapper = props => {
  const user = useContext(UserContext);
  return (
    <>
      <Authentication />
      <UserProvider>
        <GardenProvider>
          <Header />
          <div className={styles.pageWrapper}>{props.children}</div>
        </GardenProvider>
      </UserProvider>
    </>
  );
};
