import * as React from "react";
import { firestore } from "../../firebase";
import { collectIdsAndDocs } from "../../utilities";
import { PlantTile } from "../../components/molecules/plant-tile/plant-tile.component";
import styles from "./garden.module.scss";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";
import { UserPlantAdd } from "../../components/organisms/add-user-plant/add-user-plant.component";
import { trefleResponseData } from "../add-plant/add-plant.page";

type GardenState = { garden: any };

class Garden extends React.Component<{}, GardenState> {
  state = { garden: [] };

  componentDidMount = async () => {
    const snapshot = await firestore.collection("gardens").get();
    const gardenData = snapshot.docs.map(collectIdsAndDocs);
    console.log(gardenData);
    this.setState({ garden: gardenData });
  };

  handleCreate = async plant => {
    const { garden } = this.state;
    const docRef = await firestore.collection("garden").add(plant);
    const doc = await docRef.get();
    const newPlant = collectIdsAndDocs(doc);
    this.setState({ garden: [newPlant, ...garden] });
  };
  render() {
    const { garden } = this.state;
    console.log(garden);
    return (
      <div>
        <PageHeading title="My Garden" />
        <UserPlantAdd handleCreate={this.handleCreate} />
        <div className={styles.gardenGrid}>
          {garden.map((plant: trefleResponseData) => {
            return (
              <PlantTile
                addToFirecloud={this.handleCreate}
                type="garden"
                {...plant}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Garden;
