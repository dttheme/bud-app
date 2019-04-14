import React, { useState } from "react";
import styles from "./plant-tile.module.scss";
import { TileEntry } from "../../atoms/tile-entry/tile-entry.component";
import { Button } from "../../atoms/button/button.component";

type PlantTileProps = {
  type: "search" | "garden";
  id: string;
  common_name: string;
  scientific_name: string;
  slug: string;
  addToFirecloud: (props: Object) => void;
  // removeFromFirecloud: (props: string) => void;
};

const AddedToGardenSuccessMessage = () => (
  <div>Success! This plant has been added to your garden.</div>
);
export const PlantTile = (props: PlantTileProps) => {
  const [addedToGarden, setAddedToGarden] = useState(false);
  const {
    common_name,
    scientific_name,
    slug,
    id,
    addToFirecloud,
    type
    // removeFromFirecloud
  } = props;

  const handleAddToGarden = () => {
    addToFirecloud;
    setAddedToGarden(true);
  };

  const handleDeleteFromGarden = () => {
    // removeFromFirecloud(id);
  };
  return (
    <div className={styles.plantTile}>
      <div className={styles.tileTitle}>
        {common_name && (
          <TileEntry valueTitle="Common Name" value={common_name} />
        )}
        {scientific_name && (
          <TileEntry valueTitle="Scientific Name" value={scientific_name} />
        )}
      </div>
      {addedToGarden ? (
        <AddedToGardenSuccessMessage />
      ) : (
        <div className={styles.plantTileButtonWrapper}>
          {type === "garden" ? null : (
            <Button onClick={handleAddToGarden}>Add To Garden</Button>
          )}
          <Button>More Info</Button>
          {type === "search" ? null : (
            <Button onClick={handleDeleteFromGarden}>Delete</Button>
          )}
        </div>
      )}
    </div>
  );
};
