import React from "react";
// import styles from "../plant-list";
import { PlantTile } from "../../molecules/plant-tile/plant-tile.component";
import { PlantDataType } from "../../templates/app-wrapper/app-wrapper.component";

type PlantListProps = {
  type: "search" | "garden";
};

export const PlantList = ({ plantArray, type }: PlantListProps) => {
  const plantListStyles = undefined;
  // type === "garden" ? styles.gardenList : styles.resultsList;
  console.log(plantArray)
  return (
    <AppWrapper.Consumer>
    {state =>
    (<div className={plantListStyles}>
      {state.plants &&
        state.plants.map(plant => {
          console.log(plant)
          return <PlantTile key={plant.id} plant={plant} type={type} />;
        })}
    </div>)
  }
  </AppWrapper.Consumer>
  );
};
