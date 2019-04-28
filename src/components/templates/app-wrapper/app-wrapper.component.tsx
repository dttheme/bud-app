import React, { createContext } from "react";
import styles from "./app-wrapper.module.scss";
import { Header } from "../../organisms/header/header.component";
import { firestore, auth, createUserProfileDocument } from "../../../firebase";

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
  gardenId: string;
};

export const AppContext = createContext({} as AppContextType);

export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};
export class AppWrapper extends React.Component<AppWrapperType> {
  state = {
    plants: null,
    user: null,
    gardenId: " "
  };

  unsubscribeFromFirestore: any = null;
  unsubscribeFromAuth: any = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      console.log(user);
      this.setState({ user, gardenId: userAuth && userAuth.uid });
    });

    await firestore
      .collection("garden")
      .doc(this.state.gardenId)
      .collection("plants")
      .get();

    this.unsubscribeFromFirestore = firestore
      .collection("garden")
      .doc(this.state.gardenId)
      .collection("plants")
      .onSnapshot(snapshot => {
        const plants = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ plants });
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
