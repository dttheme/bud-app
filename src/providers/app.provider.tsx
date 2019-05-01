import React, { createContext } from "react";
import { collectIdsAndDocs } from "../components/templates/app-wrapper/app-wrapper.component";
import { firestore } from "../firebase";

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

type ProviderProps = {
  user: UserDataType | null;
  gardenId: string;
};
export interface AppStateType extends ProviderProps {
  plants: PlantDataType[] | null;
}

export const AppContext = createContext({} as AppStateType);

export class AppProvider extends React.Component<ProviderProps, AppStateType> {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      plants: null,
      gardenId: " "
    };
  }

  unsubscribeFromFirestore: any = null;

  componentDidMount = async () => {
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
    const { children, user, gardenId } = this.props;
    const { plants } = this.state;

    const context = { plants, gardenId, user };
    return (
      <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
  }
}
