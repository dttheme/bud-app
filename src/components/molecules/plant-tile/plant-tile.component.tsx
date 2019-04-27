import React, { useState } from "react";
import firebase from "firebase";
import { firestore, auth } from "../../../firebase";
import styles from "./plant-tile.module.scss";
import { TileEntry } from "../../atoms/tile-entry/tile-entry.component";
import { Button } from "../../atoms/button/button.component";
import {
  UserDataType,
  PlantDataType
} from "../../templates/app-wrapper/app-wrapper.component";

type PlantTileProps = {
  type: "search" | "garden";
  // FIX: typing below
  plant: any;
  gardenId: string | undefined;
  // user: UserDataType
};

const AddedToGardenSuccessMessage = () => (
  <div>Success! This plant has been added to your garden.</div>
);
export const PlantTile = (props: PlantTileProps) => {
  const { type, gardenId } = props;

  const [addedToGarden, setAddedToGarden] = useState(false);

  // const { uid = "", displayName = "", email = "" } = auth.currentUser || {};
  const plantRef = firestore.doc(`garden/${gardenId}`);

  console.log(props);
  let deleteFromGarden;
  let plantData = props.plant;
  if (type === "garden") {
    deleteFromGarden = () => {
      plantRef.delete();
    };
  }

  const addToGarden = () => {
    if (gardenId !== undefined) {
      const gardenRef = firestore.collection("garden").doc(gardenId);
      gardenRef.update({
        plant: firebase.firestore.FieldValue.arrayUnion(props.plant)
      });
    }
    firestore.collection("garden").add(props.plant);

    setAddedToGarden(true);
  };
  return (
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
  );
};
