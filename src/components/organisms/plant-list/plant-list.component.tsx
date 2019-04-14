import React from "react";
import firebase from "../../firebase";
import styles from "./plant-list.module.scss";
import { PlantTile } from "../../molecules/plant-tile/plant-tile.component";

type PlantListProps = {
  type: "search" | "garden";
  searchResultsLoaded: boolean;
  responseData: {
    slug: string;
    common_name: string;
    scientific_name: string;
    plant_id: number;
    user_id: number;
  }[];
};

export const PlantList = ({
  responseData,
  searchResultsLoaded,
  type
}: PlantListProps) => {
  const handleAddToGarden = plant => e => {
    e.preventDefault();
    const db = firebase.firestore();
    const plantRef = db.collection("gardens").add({
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      // trefle_id: plant.plant_id,
      user_id: 1
    });
    console.log("add to garden");
  };
  // const GET_PLANT_IMAGE = () => {};

  return (
    responseData &&
    responseData.map(plant => {
      return (
        <div className={styles.plantListWrapper}>
          <PlantTile
            {...plant}
            type={type}
            addToGarden={handleAddToGarden(plant)}
          />
        </div>
      );
    })
  );
};
