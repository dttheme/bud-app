import React from "react";
import styles from "./plant-tile.module.scss";
import { TileEntry } from "../../atoms/tile-entry/tile-entry.component";

type PlantTileProps = {
  type: "search" | "garden";
  id?: string;
  common_name: string;
  scientific_name: string;
  slug: string;
  addToGarden: (props: Object) => void;
};
export const PlantTile = (props: PlantTileProps) => {
  const { common_name, scientific_name, slug, addToGarden, type } = props;
  return (
    <div key={slug} className={styles.plantTile}>
      <div className={styles.tileTitle}>
        {common_name && (
          <TileEntry valueTitle="Common Name" value={common_name} />
        )}
        {scientific_name && (
          <TileEntry valueTitle="Scientific Name" value={scientific_name} />
        )}
      </div>
      <div className={styles.plantTileButtonWrapper}>
        {type === "garden" ? null : (
          <button type="submit" onClick={addToGarden}>
            Add To Garden
          </button>
        )}
        <button name="moreInfo" type="submit">
          More Info
        </button>
        {type === "search" ? null : <button>Delete</button>}
      </div>
    </div>
  );
};
