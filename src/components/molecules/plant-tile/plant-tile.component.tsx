import React, { useState } from "react";
import { firestore } from "../../../firebase";
import styles from "./plant-tile.module.scss";
import { TileEntry } from "../../atoms/tile-entry/tile-entry.component";
import { Button } from "../../atoms/button/button.component";

type PlantTileProps = {
  type: "search" | "garden";
  plant: {
    id: string;
    common_name?: string;
    scientific_name?: string;
    slug?: string;
  };
};

const AddedToGardenSuccessMessage = () => (
  <div>Success! This plant has been added to your garden.</div>
);
export const PlantTile = (props: PlantTileProps) => {
  const { type } = props;
  const { common_name, scientific_name, slug, id } = props.plant;
  const [addedToGarden, setAddedToGarden] = useState(false);

  const plantRef = firestore.doc(`garden/${id}`);
  const deleteFromGarden = () => plantRef.delete();

  const addToGarden = () =>
    firestore.collection("garden").add(props.plant) && setAddedToGarden(true);

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
            <Button onClick={addToGarden}>Add To Garden</Button>
          )}
          <Button>More Info</Button>
          {type === "search" ? null : (
            <Button onClick={deleteFromGarden}>Delete</Button>
          )}
        </div>
      )}
    </div>
  );
};
