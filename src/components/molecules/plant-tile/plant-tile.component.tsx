import React from "react";
import styles from "./plant-tile.module.scss";

type PlantTileProps = {
  id?: string;
  common_name: string;
  scientific_name: string;
  slug: string;
  addToGarden: (props: Object) => void;
};
export const PlantTile = (props: PlantTileProps) => {
  const { common_name, scientific_name, slug, addToGarden } = props;
  return (
    <div key={slug} className={styles.plantTile}>
      <div>
        <div>Common Name:</div>
        {common_name}
      </div>
      <div>
        <div> Scientific Name:</div> {scientific_name}
      </div>
      <div className={styles.plantTileButtonWrapper}>
        <button type="submit" onClick={addToGarden}>
          Add To Garden
        </button>
        <button name="moreInfo" type="submit">
          More information
        </button>
        <button>Delete</button>
      </div>
    </div>
  );
};
