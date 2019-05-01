import React, { createContext } from "react";
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
};

export interface AppStateType {
  plants: PlantDataType[] | null;
  user: UserDataType | null;
  gardenId: string;
}

export const AppContext = createContext({} as AppStateType);

export class AppProvider extends React.Component<{}, AppStateType> {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      plants: null,
      gardenId: " "
    };
  }
  unsubscribeFromAuth: any = null;
  unsubscribeFromFirestore: any = null;

  componentDidMount = async () => {
    await firestore
      .collection("garden")
      .doc(this.state.gardenId)
      .collection("plants")
      .get();

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      console.log(userAuth);
      this.setState({
        user,
        gardenId: user
      });

      this.unsubscribeFromFirestore = firestore
        .collection("garden")
        .doc(this.state.gardenId)
        .collection("plants")
        .onSnapshot(snapshot => {
          const plants = snapshot.docs.map(collectIdsAndDocs);
          this.setState(prevState => ({ ...prevState, plants }));
        });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
    this.unsubscribeFromAuth();
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;
    return (
      <AppContext.Provider value={this.state}>
        <Authentication user={user} />
        {children}
      </AppContext.Provider>
    );
  }
}
