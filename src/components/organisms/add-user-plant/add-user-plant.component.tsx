import React from "react";
import styles from "./add-user-plant.module.scss";
import { Link } from "react-router-dom";

export const UserPlantAdd = () => {
  return (
    <div>
      <Link to={`/add-plant`}>Back to Plant Search</Link>
      <form action="">
        <div className={styles.formRow}>
          <input type="text" placeholder="Common Name" />
          <input type="text" placeholder="Scientific Name" />
        </div>
        <button>Add to Garden</button>
      </form>
    </div>
  );
};
