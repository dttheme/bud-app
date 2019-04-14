import React from "react";
import { Link } from "react-router-dom";

export const UserPlantAdd = () => {
  return (
    <div>
      <Link to={`/add-plant`}>Back to Plant Search</Link>
      <form action="">
        <input type="text" />
        <button>Add to Garden</button>
      </form>
    </div>
  );
};
