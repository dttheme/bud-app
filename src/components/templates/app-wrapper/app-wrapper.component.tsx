import React, { createContext } from "react";
import styles from "./app-wrapper.module.scss";
import { Header } from "../../organisms/header/header.component";
import { firestore } from "../../../firebase";
import { collectIdsAndDocs } from "../../../utilities";

type AppWrapperType = {
  children: React.ReactNode;
};

export const AppContext = createContext([{}]);

export class AppWrapper extends React.Component<AppWrapperType> {
  state = { garden: [{}], user: null };

  unsubscribe: any = null;

  componentDidMount = async () => {
    this.unsubscribe = firestore.collection("garden").onSnapshot(snapshot => {
      const garden = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ garden });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  render() {
    return (
      <>
        <Header />
        <div className={styles.pageWrapper}>
          <AppContext.Provider value={this.state.garden}>
            {this.props.children}
          </AppContext.Provider>
        </div>
      </>
    );
  }
}
