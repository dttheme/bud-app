import React, { useState } from "react";
import styles from "./add-plant.module.scss";
import axios from "axios";
import { DbPlantSearch } from "../../components/organisms/add-db-plant/add-db-plant.component";
import { Link } from "react-router-dom";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";
import { Button } from "../../components/atoms/button/button.component";
// const mockResponse: any = [
//   {
//     slug: "hieracium-basileucum",
//     scientific_name: "Hieracium basileucum",
//     link: "http://trefle.io/api/plants/265337",
//     id: 265337,
//     complete_data: false,
//     common_name: null
//   },
//   {
//     slug: "erigeron-basilobatus",
//     scientific_name: "Erigeron basilobatus",
//     link: "http://trefle.io/api/plants/268717",
//     id: 268717,
//     complete_data: false,
//     common_name: null
//   },
//   {
//     slug: "artemisia-basilica",
//     scientific_name: "Artemisia basilica",
//     link: "http://trefle.io/api/plants/275052",
//     id: 275052,
//     complete_data: false,
//     common_name: null
//   },
//   {
//     slug: "callichilia-basileis",
//     scientific_name: "Callichilia basileis",
//     link: "http://trefle.io/api/plants/218306",
//     id: 218306,
//     complete_data: false,
//     common_name: null
//   }
// ];

export type plantDataType = {
  slug: string;
  common_name: string;
  scientific_name: string;
  id: string;
};

export const AddPlantPage = () => {
  const [queryString, setQueryString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [searchResultsLoaded, setSearchResultsLoaded] = useState(false);

  const GET_PLANTS = (value: string) => {
    const currentPage = pageNum >= 1 ? pageNum : "";
    axios({
      method: "get",
      url:
        "https://cors-anywhere.herokuapp.com/" +
        `https://trefle.io/api/plants/?token=${
          process.env.REACT_APP_TREFLE_KEY
        }&page_size=4&q=${value}&page=${currentPage}`
    })
      .then(response => {
        console.log(response.data);
        setResponseData(response.data);
        // setResponseData(mockResponse);
      })
      .then(() => {
        setIsLoading(false);
        setSearchResultsLoaded(true);
      });
  };

  // TODO: async if using onChange
  const handleInputChange = (value: string) => {
    setQueryString(value);
  };
  const handleSearchClick = (value: string) => (e: any) => {
    e.preventDefault();
    setIsLoading(true);
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
  const tryAgain = () => {
    setQueryString("");
    setResponseData([]);
    setPageNum(0);
    setSearchResultsLoaded(false);
  };

  return (
    <div className={styles.addPlantWrapper}>
      <PageHeading title="Add a Plant" />
      <div>
        from the <a href="https://trefle.io/">Trefle Plant API</a>
      </div>
      <DbPlantSearch
        tryAgain={tryAgain}
        handleInputChange={handleInputChange}
        handleSearchClick={handleSearchClick}
        isLoading={isLoading}
        queryString={queryString}
        responseData={responseData}
        searchResultsLoaded={searchResultsLoaded}
        pageNum={pageNum}
        handlePaginationClick={handlePaginationClick}
      />
    </div>
  );
};

export default AddPlantPage;
