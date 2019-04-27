import React from "react";
// import styles from "../plant-list";
import { PlantTile } from "../../molecules/plant-tile/plant-tile.component";
import {
  PlantDataType,
  AppContextType,
  AppContext
} from "../../templates/app-wrapper/app-wrapper.component";

type PlantListProps = {
  type: "search" | "garden";
  // FIX: typing below
  plantDataArray: PlantDataType[] | null;
  gardenId?: string;
};

export const PlantList = ({
  plantDataArray,
  type,
  gardenId
}: PlantListProps) => {
  const plantListStyles = undefined;
  // type === "garden" ? styles.gardenList : styles.resultsList;
  console.log(plantDataArray);
  return (
    <div className={plantListStyles}>
      {plantDataArray &&
        plantDataArray.map(plant => {
          console.log(plant);
          return (
            <PlantTile
              key={plant.id}
              gardenId={gardenId}
              plant={plant}
              type={type}
            />
          );
        })}
    </div>
  );
};
