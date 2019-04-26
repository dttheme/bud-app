import * as React from "react";
import { PlantList } from "../../components/templates/plant-list/plant-list.component";
import { AppContext } from "../../components/templates/app-wrapper/app-wrapper.component";

class Garden extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {state => (
          <div>
            <h2>Garden</h2>
            <PlantList type="garden" plantDataArray={state.plants} />
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Garden;
