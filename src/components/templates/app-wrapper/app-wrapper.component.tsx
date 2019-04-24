import React, { createContext } from "react";
import styles from "./app-wrapper.module.scss";
import { Header } from "../../organisms/header/header.component";
import { firestore, auth } from "../../../firebase";
import { collectIdsAndDocs } from "../../../utilities";

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
    plants: PlantDataType[];
    user: UserDataType;
};

export const AppContext = createContext({} as AppContextType);

export class AppWrapper extends React.Component<AppWrapperType> {
  state = {
      plants: [{ id: "", slug: "", common_name: "", scientific_name: "" }],
      user: {
        email: "",
        displayName: "",
        uid: "",
        // phoneNumber: "",
        // photoURL: "",
        // providerId: ""
      }
  };

  unsubscribeFromFirestore: any = null;
  unsubscribeFromAuth: any = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore
      .collection("garden")
      .onSnapshot(snapshot => {
        const garden = snapshot.docs.map(collectIdsAndDocs);
        console.log(garden)
        this.setState({ garden });
      });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState(prevState => ({ user }));
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
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
