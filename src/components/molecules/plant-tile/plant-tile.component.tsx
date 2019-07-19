import React, { useState, useContext } from "react";
import firebase from "firebase";
import { firestore, auth } from "../../../firebase";
import styles from "./plant-tile.module.scss";
import { TileEntry } from "../../atoms/tile-entry/tile-entry.component";
import { Button } from "../../atoms/button/button.component";
import {
  UserDataType,
  PlantDataType
} from "../../../providers/garden.provider";
import { UserContext } from "../../../providers/user.provider";
import { Tooltip } from "../../atoms/tooltip/tooltip.component";

type PlantTileProps = {
  type: "search" | "garden";
  // FIX: typing below
  plants: PlantDataType | any;
  gardenId: string;
};

const AddedToGardenSuccessMessage = () => (
  <div>Success! This plant has been added to your garden.</div>
);

export const PlantTile = ({ type, gardenId, plants }: PlantTileProps) => {
  const [addedToGarden, setAddedToGarden] = useState(false);
  const [adding, setAdding] = useState(false);
  const { uid = "", displayName = "", email = "" } = auth.currentUser || {};
  const authState = useContext(UserContext);

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
    // add user data
    let userProm = plantRef.set({
      user: { uid, display_name: displayName, email }
    });
    // add plant data w/ user data
    let plantProm = plantRef
      .collection("plants")
      .add({ user: { uid, display_name: displayName, email }, plants });

    try {
      Promise.all([userProm, plantProm]);
      setAddedToGarden(true);
    } catch (error) {
      console.log(error);
    }
  };

  const tile = (
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

          {/* <Button>More Info</Button> */}

          {type === "search" ? null : (
            <Button onClick={deleteFromGarden} color="red">
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );

  if (type === "garden") {
    return authState.user !== null &&
      authState.user !== undefined &&
      authState.user.uid == gardenId ? (
      tile
    ) : (
      <div>You don't have any posts yet!</div>
    );
  } else {
    return tile;
  }
};
