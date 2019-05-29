import React, { useContext } from "react";
import styles from "./plant-list.module.scss";
import { PlantTile } from "../../molecules/plant-tile/plant-tile.component";
import {
  GardenContext,
  PlantDataType
} from "../../../providers/garden.provider";

type PlantListProps = {
  type: "search" | "garden";
  plantDataArray?: PlantDataType[] | null;
};

export const PlantList = ({ plantDataArray, type }: PlantListProps) => {
  const garden = useContext(GardenContext);
  const plantListStyles = undefined;
  // type === "garden" ? styles.gardenList : styles.resultsList;
  let plantData = type == "garden" ? garden.plants : plantDataArray;
  return (
    <div className={styles.plantListWrapper}>
      {plantData &&
        plantData.map(plant => {
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
