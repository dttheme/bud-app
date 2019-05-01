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
  state = { user: null, gardenId: " " };
  unsubscribeFromAuth: any = null;
  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      console.log(user.uid);
      this.setState({
        user,
        gardenId: user.uid
      });
    });
  };
  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };
  render() {
    const { user, gardenId } = this.state;
    return (
      <>
        <AppProvider user={user} gardenId={gardenId}>
          <Header />
          <Authentication user={user} />
          <div className={styles.pageWrapper}>{this.props.children}</div>
        </AppProvider>
      </>
    );
  }
}
