import React, { useState } from "react";
import styles from "./add-user-plant.module.scss";
import history from "../../../history";
import { Link } from "react-router-dom";
import { Tooltip } from "../../atoms/tooltip/tooltip.component";
import { firestore } from "../../../firebase";
import { Button } from "../../atoms/button/button.component";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper.component";

export const UserPlantAdd = ({
  handleCreate
}: {
  handleCreate: (plant: Object) => void;
}) => {
  const [commonName, setCommonName] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const plant = {
      // TODO: Pass down db id
      id: Date.now().toString(),
      common_name: commonName,
      notes: notes
    };

    firestore
      .collection("gardens")
      .doc(plant.id)
      .set(plant);
    handleCreate(plant);
    history.push("/garden");
    console.log("Added plant to garden.");
  };
  return (
    <div>
      <Link to={`/add-plant`}>
        <Tooltip text="Back to Search">
          <IconWrapper ariaLabel="Back to Search">👈</IconWrapper>
        </Tooltip>
      </Link>
      <form action="">
        <div className={styles.formRow}>
          <input
            onChange={e => setCommonName(e.target.value)}
            value={commonName}
            type="text"
            placeholder="Common Name"
          />
          <input
            onChange={e => setNotes(e.target.value)}
            value={notes}
            placeholder="Notes"
          />
        </div>
        <Button onClick={handleSubmit}>Add Plant</Button>
      </form>
    </div>
  );
};
