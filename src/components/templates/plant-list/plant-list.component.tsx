import React, { useContext } from "react";
// import styles from "../plant-list";
import { PlantTile } from "../../molecules/plant-tile/plant-tile.component";
import {
  GardenContext,
  PlantDataType
} from "../../../providers/garden.provider";
import { UserContext } from "../../../providers/user.provider";

type PlantListProps = {
  type: "search" | "garden";
  plantDataArray?: PlantDataType[] | null;
};

export const PlantList = ({ plantDataArray, type }: PlantListProps) => {
  const garden = useContext(GardenContext);
  const plantListStyles = undefined;
  // type === "garden" ? styles.gardenList : styles.resultsList;
  // console.log(plantDataArray);
  let plantData = type == "garden" ? garden.plants : plantDataArray;
  // console.log(plantData);
  return (
    <div className={plantListStyles}>
      {plantData &&
        plantData.map(plant => {
          // console.log(plant);
          return (
            <PlantTile
              key={plant.id}
              gardenId={garden.gardenId}
              plants={plant}
              type={type}
            />
          );
        })}
    </div>
  );
};
