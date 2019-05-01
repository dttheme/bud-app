import React from "react";
import styles from "./app-wrapper.module.scss";
import { Header } from "../../organisms/header/header.component";
import { AppProvider, UserDataType } from "../../../providers/app.provider";
import { auth, createUserProfileDocument } from "../../../firebase";
import { Authentication } from "../../organisms/authentication/authentication.component";

type AppWrapperType = {
  children: React.ReactNode;
};

export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

export class AppWrapper extends React.Component<AppWrapperType> {
  render() {
    return (
      <>
        <AppProvider>
          <Header />
          <div className={styles.pageWrapper}>{this.props.children}</div>
        </AppProvider>
      </>
    );
  }
}
