import React from "react";
import styles from "./app-wrapper.module.scss";
import { GardenProvider } from "../../../providers/garden.provider";
import { UserProvider } from "../../../providers/user.provider";

export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

export const AppWrapper = props => {
  return (
    <>
      <UserProvider>
        <GardenProvider>
          <div className={styles.appWrapper}>{props.children}</div>
        </GardenProvider>
      </UserProvider>
    </>
  );
};
