import React from "react";
// import styles from "../plant-list";
import { PlantTile } from "../../molecules/plant-tile/plant-tile.component";
import { plantDataType } from "../../../pages/add-plant/add-plant.page";

type PlantListProps = {
  type: "search" | "garden";
  plantArray: plantDataType[];
};

export const PlantList = ({ plantArray, type }: PlantListProps) => {
  const plantListStyles = undefined;
  // type === "garden" ? styles.gardenList : styles.resultsList;
  return (
    <div className={plantListStyles}>
      {plantArray &&
        plantArray.map(plant => {
          return <PlantTile key={plant.id} plant={plant} type={type} />;
        })}
    </div>
  );
};
