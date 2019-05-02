import React, { createContext, useContext, useState, useEffect } from "react";
import { collectIdsAndDocs } from "../components/templates/app-wrapper/app-wrapper.component";
import { firestore } from "../firebase";
import { UserContext } from "./user.provider";

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

export interface GardenStateType {
  plants: PlantDataType[] | null;
  gardenId: string;
}

export const GardenContext = createContext({} as GardenStateType);

export const GardenProvider = props => {
  const [gardenId, setGardenId] = useState(" ");
  const [plants, setPlants] = useState(null);

  const fetchFirestore = async () => {
    await firestore
      .collection("garden")
      .doc(gardenId)
      .collection("plants")
      .get();
  };
  let unsubscribeFromFirestore: any = null;
  const user = useContext(UserContext).user;
  useEffect(() => {
    user !== null ? setGardenId(user.uid) : null;
    fetchFirestore();
    unsubscribeFromFirestore = firestore
      .collection("garden")
      .doc(gardenId)
      .collection("plants")
      .onSnapshot(snapshot => {
        const plantSnaps: any = snapshot.docs.map(collectIdsAndDocs);
        setPlants(plantSnaps);
      });
    return function cleanup() {
      unsubscribeFromFirestore;
    };
  });
  const { children } = props;
  // console.log(plants);
  return (
    <GardenContext.Provider value={{ gardenId, plants }}>
      {children}
    </GardenContext.Provider>
  );
};
