import React, { createContext } from "react";
import styles from "./app-wrapper.module.scss";
import { Header } from "../../organisms/header/header.component";
import { firestore, auth } from "../../../firebase";

type AppWrapperType = {
  children: React.ReactNode;
};

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

export type AppContextType = {
  plants: PlantDataType[] | null;
  user: UserDataType | null;
  gardenId?: string;
};

export const AppContext = createContext({} as AppContextType);

export class AppWrapper extends React.Component<AppWrapperType> {
  state = {
    plants: null,
    user: null,
    gardenId: undefined
  };

  unsubscribeFromFirestore: any = null;
  unsubscribeFromAuth: any = null;

  collectIdsAndDocs = doc => {
    this.setState({ gardenId: doc.id });
    return { id: doc.id, ...doc.data() };
  };

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore
      .collection("garden")
      .onSnapshot(snapshot => {
        const plantSnapshot: any = snapshot.docs.map(this.collectIdsAndDocs);
        this.setState({
          plants: plantSnapshot
        });
      });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      const { displayName, uid, email } = user as any;
      this.setState({ user: { displayName, uid, email } });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    console.log(this.state);
    return (
      <>
        <AppContext.Provider value={this.state}>
          <Header />
          <div className={styles.pageWrapper}>{this.props.children}</div>
        </AppContext.Provider>
      </>
    );
  }
}
