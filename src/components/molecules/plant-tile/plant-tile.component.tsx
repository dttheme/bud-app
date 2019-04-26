import React, { useState } from "react";
import { firestore, auth } from "../../../firebase";
import styles from "./plant-tile.module.scss";
import { TileEntry } from "../../atoms/tile-entry/tile-entry.component";
import { Button } from "../../atoms/button/button.component";
import { UserDataType, PlantDataType } from "../../templates/app-wrapper/app-wrapper.component";

type PlantTileProps = {
  type: "search" | "garden";
  plant: {
    id: string;
    plant: {
      common_name
    }

  };
  // user: UserDataType
};



const AddedToGardenSuccessMessage = () => (
  <div>Success! This plant has been added to your garden.</div>
);
export const PlantTile = (props) => {
  const { type } = props;
  const { common_name, scientific_name, slug, id } = props.plant && props.plant.plant;
  const [addedToGarden, setAddedToGarden] = useState(false);

  const { uid = "", displayName = "", email = "" } = auth.currentUser || {};

  const plantRef = firestore.doc(`garden/${id}`);
  const deleteFromGarden = () => {
    console.log(id)
    console.log('clicked!')
    plantRef.delete()};

  const addToGarden = () => {
    const accountDataObject = {
      plant: props.plant,
      user: { uid, displayName, email }
    };
    return (
      firestore.collection("garden").add(accountDataObject) &&
      setAddedToGarden(true)
    );
  };
  console.log(props)
  return (
    // <AppContext.Consumer>
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
    // </AppContext.Consumer>
  );
};
