import * as React from "react";
import { PlantList } from "../../components/templates/plant-list/plant-list.component";

class Garden extends React.Component {
  render() {
    return (
      <div>
        <h2>Garden</h2>
        <PlantList type="garden" />
      </div>
    );
  }
}

export default Garden;
