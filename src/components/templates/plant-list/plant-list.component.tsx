import React from "react";
// import styles from "../plant-list";
import { PlantTile } from "../../molecules/plant-tile/plant-tile.component";
import { PlantDataType, AppContextType } from "../../templates/app-wrapper/app-wrapper.component";

type PlantListProps = {
  type: "search" | "garden";
  plantDataArray: AppContextType| any;
};

export const PlantList = ({ plantDataArray, type }: PlantListProps) => {
  const plantListStyles = undefined;
  // type === "garden" ? styles.gardenList : styles.resultsList;
  return (
    <div className={plantListStyles}>
      {plantDataArray &&
        plantDataArray.map(plant => {
          return <PlantTile key={plant.id} plant={plant} type={type} />;
        })}
    </div>
  );
};
