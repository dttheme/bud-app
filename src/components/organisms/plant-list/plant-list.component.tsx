import React from "react";
import firebase from "../../../firebase";
import styles from "./plant-list.module.scss";
import { PlantTile } from "../../molecules/plant-tile/plant-tile.component";
import { trefleResponseData } from "../../../pages/add-plant/add-plant.page";

type PlantListProps = {
  type: "search" | "garden";
  searchResultsLoaded: boolean;
  responseData: trefleResponseData;
};

export const PlantList = ({
  responseData,
  searchResultsLoaded,
  type
}: PlantListProps) => {
  const db = firebase.firestore();
  const addPlantToFirecloud = plant => e => {
    e.preventDefault();
    db.collection("gardens").add({
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      // trefle_id: plant.plant_id,
      user_id: 1
    });
    console.log("add to garden");
  };
  const deletePlantFromFirecloud = plant => e => {
    e.preventDefault();
    db.collection("gardens");
  };
  // const GET_PLANT_IMAGE = () => {};

  return (
    responseData &&
    responseData.map(plant => {
      return (
        <PlantTile
          key={plant.id}
          {...plant}
          type={type}
          addToFirecloud={addPlantToFirecloud(plant)}
          removeFromFirecloud={deletePlantFromFirecloud(plant.id)}
        />
      );
    })
  );
};
