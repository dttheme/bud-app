import React from "react";
import styles from "./plant-tile.module.scss";

export const PlantTile = ({
  id,
  common_name,
  scientific_name
}: {
  id: string;
  common_name: string;
  scientific_name: string;
}) => {
  return (
    <div className={styles.plantTile}>
      <h2>{common_name}</h2>
      <h3>{scientific_name}</h3>
      <button>Delete</button>
      <button>More info</button>
    </div>
  );
};
