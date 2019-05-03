import React, { createContext, useContext, useState, useEffect } from "react";
import { collectIdsAndDocs } from "../components/templates/app-wrapper/app-wrapper.component";
import { firestore, auth } from "../firebase";
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
  const id = useContext(UserContext).gardenId;

  const fetchFirestore = async () => {
    await firestore
      .collection("garden")
      .doc(gardenId)
      .collection("plants")
      .get();
  };

  fetchFirestore;
  useEffect(() => {
    id && setGardenId(id);
    const unsubscribeFromFirestore = firestore
      .collection("garden")
      .doc(gardenId)
      .collection("plants")
      .onSnapshot(snapshot => {
        const plantSnaps: any = snapshot.docs.map(collectIdsAndDocs);
        setPlants(plantSnaps);
      });
    return () => {
      unsubscribeFromFirestore;
    };
  }, [plants]);

  const { children } = props;
  // console.log(plants);
  return (
    <GardenContext.Provider value={{ gardenId, plants }}>
      {children}
    </GardenContext.Provider>
  );
};
