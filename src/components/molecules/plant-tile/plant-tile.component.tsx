import React, { useState } from "react";
import firebase from "firebase";
import { firestore, auth } from "../../../firebase";
import styles from "./plant-tile.module.scss";
import { TileEntry } from "../../atoms/tile-entry/tile-entry.component";
import { Button } from "../../atoms/button/button.component";
import { UserDataType, PlantDataType } from "../../../providers/app.provider";

type PlantTileProps = {
  type: "search" | "garden";
  // FIX: typing below
  plants: PlantDataType | any;
  gardenId: string;
  user?: UserDataType | null;
};

const AddedToGardenSuccessMessage = () => (
  <div>Success! This plant has been added to your garden.</div>
);
export const PlantTile = ({ type, gardenId, user, plants }: PlantTileProps) => {
  const [addedToGarden, setAddedToGarden] = useState(false);

  const { uid = "", displayName = "", email = "" } = auth.currentUser || {};
  const plantRef = firestore.doc(`garden/${gardenId}`);

  let deleteFromGarden;
  let plantData = plants;
  if (type === "garden") {
    deleteFromGarden = () => {
      plantRef
        .collection("plants")
        .doc(plants.id)
        .delete();
    };
    plantData = plants.plants;
  }

  const addToGarden = async () => {
    await firestore
      .collection("garden")
      .doc(gardenId)
      .set({ user: { uid, display_name: displayName, email } });

    await firestore
      .collection("garden")
      .doc(gardenId)
      .collection("plants")
      .add({ user: { uid, display_name: displayName, email }, plants });

    setAddedToGarden(true);
  };

  console.log(user && user.uid == gardenId);

  return user && user.uid == gardenId ? (
    <div className={styles.plantTile}>
      <div className={styles.tileTitle}>
        {plantData.common_name && (
          <TileEntry valueTitle="Common Name" value={plantData.common_name} />
        )}
        {plantData.scientific_name && (
          <TileEntry
            valueTitle="Scientific Name"
            value={plantData.scientific_name}
          />
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
  ) : null;
};
