import React, { createContext } from "react";
import styles from "./app-wrapper.module.scss";
import { Header } from "../../organisms/header/header.component";
import { firestore, auth } from "../../../firebase";
import { collectIdsAndDocs } from "../../../utilities";
import { plantDataType } from "../../../pages/add-plant/add-plant.page";

type AppWrapperType = {
  children: React.ReactNode;
};

type AppContextType = {
  garden: plantDataType[];
  user: {};
};
export const AppContext = createContext({} as AppContextType);

export class AppWrapper extends React.Component<AppWrapperType> {
  state = {
    garden: [{ id: "", slug: "", common_name: "", scientific_name: "" }],
    user: {}
  };

  unsubscribeFromFirestore: any = null;
  unsubscribeFromAuth: any = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore
      .collection("garden")
      .onSnapshot(snapshot => {
        const garden = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ garden });
      });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      console.log(user);
      this.setState(prevState => ({ user, prevState }));
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
