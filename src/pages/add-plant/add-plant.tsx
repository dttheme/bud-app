import React, { useState } from "react";
import styles from "./add-plant.module.scss";
import axios from "axios";
import firebase from "../../components/firebase";

type PlantListProps = {
  slug: string;
  common_name: string;
  scientific_name: string;
  plant_id: number;
  user_id: number;
}[];

const PlantList = (props: PlantListProps) => {
  const handleAddToGarden = (e, plant) => {
    e.preventDefault();
    const db = firebase.firestore();
    const plantRef = db.collection("gardens").add({
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      // trefle_id: plant.plant_id,
      user_id: 1
    });
    console.log("add to garden");
  };
  // const GET_PLANT_IMAGE = () => {};
  const list =
    props &&
    props.map(plant => {
      return (
        <div key={plant.slug} className={styles.plantTile}>
          <div>
            <div>Common Name:</div>
            {plant.common_name}
          </div>
          <div>
            <div> Scientific Name:</div> {plant.scientific_name}
          </div>
          <button type="submit" onClick={e => handleAddToGarden(e, plant)}>
            Add To Garden
          </button>
          <button name="moreInfo" type="submit">
            More information
          </button>
        </div>
      );
    });
  4;
  const sorry = `Sorry, we couldn't find that plant`;

  return props.length > 0 ? list : sorry;
};

export const AddPlant = () => {
  const [queryString, setQueryString] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const GET_PLANTS = (value: string) => {
    const currentPage = pageNum >= 1 ? `&page=${pageNum}` : "";
    console.log(pageNum);
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/" +
          `https://trefle.io/api/plants/?token=${
            process.env.REACT_APP_TREFLE_KEY
          }&page_size=4&q=${value}${currentPage}`
      )
      .then(response => {
        console.log(response.data);
        setResponseData(response.data);
      });
  };

  // TODO: Debouncer if using onChange
  const handleInputChange = (value: string) => {
    setQueryString(value);
  };
  const handleSearchClick = (value: string) => (e: any) => {
    e.preventDefault();
    GET_PLANTS(value);
  };
  const handlePageNumber = (type: string) => {
    type === "increment" ? setPageNum(pageNum + 1) : setPageNum(pageNum - 1);
  };
  const handlePaginationClick = (type: string) => (e: any) => {
    e.preventDefault();
    handlePageNumber(type);
    GET_PLANTS(queryString);
  };

  return (
    <div>
      <h1>Add Plant!</h1>
      <form>
        <input
          placeholder="Search plants..."
          type="text"
          name="search input"
          value={queryString}
          onChange={e => handleInputChange(e.target.value)}
        />
        <button onClick={handleSearchClick(queryString)}>Search</button>
      </form>
      <div className={styles.plantListWrapper}>{PlantList(responseData)}</div>
      <div>
        {pageNum > 0 ? (
          <span onClick={handlePaginationClick("decrement")}>👈</span>
        ) : null}
        {responseData.length == 4 ? (
          <span onClick={handlePaginationClick("increment")}>👉</span>
        ) : null}
      </div>
    </div>
  );
};

export default AddPlant;
