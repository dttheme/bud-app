import React, { useState } from "react";
import styles from "./add-plant.module.scss";
import axios from "axios";

type PlantListProps = {
  slug: string;
  common_name: string;
  scientific_name: string;
}[];

const PlantList = (props: PlantListProps) => {
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
          <button type="submit">Add To Garden</button>
          <button name="moreInfo" type="submit">
            More information
          </button>
        </div>
      );
    });
  const sorry = `Sorry, we couldn't find that plant`;
  return props.length > 0 ? list : sorry;
};

export const AddPlant = () => {
  const [queryString, setQueryString] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const handleInputChange = (value: string) => {
    GET_PLANTS(value);
    setQueryString(value);
  };

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
  const handlePageNumber = (type: string) => {
    type === "increment" ? setPageNum(pageNum + 1) : setPageNum(pageNum - 1);
    return undefined;
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
