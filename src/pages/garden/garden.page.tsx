import * as React from "react";
import { firestore } from "../../components/firebase";
import { PlantTile } from "../../components/molecules/plant-tile/plant-tile.component";
import styles from "./garden.module.scss";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";

type GardenState = { garden: any };

class Garden extends React.Component<{}, GardenState> {
  constructor(props) {
    super(props);
    this.state = { garden: [] };
  }

  componentDidMount = async () => {
    const snapshot = await firestore.collection("gardens").get();
    const gardenData = snapshot.docs.map(doc => {
      return { ...doc.data() };
    });
    console.log(gardenData);

    this.setState({ garden: gardenData });
  };
  render() {
    const { garden } = this.state;
    console.log(garden);
    return (
      <div>
        <PageHeading title="My Garden" />
        <div className={styles.gardenGrid}>
          {garden.map(plant => {
            return <PlantTile key={plant.id} type="garden" {...plant} />;
          })}
        </div>
      </div>
    );
  }
}

export default Garden;
