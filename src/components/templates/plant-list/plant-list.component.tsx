import React from "react";
// import styles from "../plant-list";
import { PlantTile } from "../../molecules/plant-tile/plant-tile.component";
import { AppContext, PlantDataType } from "../../../providers/app.provider";

type PlantListProps = {
  type: "search" | "garden";
  plantDataArray?: PlantDataType[] | null;
};

export const PlantList = ({ plantDataArray, type }: PlantListProps) => {
  const plantListStyles = undefined;
  // type === "garden" ? styles.gardenList : styles.resultsList;
  return (
    <AppContext.Consumer>
      {state => {
        console.log(state);
        console.log(plantDataArray);
        let plantData = type == "garden" ? state.plants : plantDataArray;
        return (
          <div className={plantListStyles}>
            {plantData &&
              plantData.map(plant => {
                console.log(plant);
                return (
                  <PlantTile
                    key={plant.id}
                    gardenId={state.gardenId}
                    plants={plant}
                    type={type}
                  />
                );
              })}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};
