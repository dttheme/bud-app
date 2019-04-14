import React, { useState } from "react";
import styles from "./add-plant.module.scss";
import axios from "axios";
import { DbPlantSearch } from "../../components/organisms/add-db-plant/add-db-plant.component";
import { UserPlantAdd } from "../../components/organisms/add-user-plant/add-user-plant.component";
import { Link } from "react-router-dom";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";
const mockResponse: any = [
  {
    slug: "hieracium-basileucum",
    scientific_name: "Hieracium basileucum",
    link: "http://trefle.io/api/plants/265337",
    id: 265337,
    complete_data: false,
    common_name: null
  },
  {
    slug: "erigeron-basilobatus",
    scientific_name: "Erigeron basilobatus",
    link: "http://trefle.io/api/plants/268717",
    id: 268717,
    complete_data: false,
    common_name: null
  },
  {
    slug: "artemisia-basilica",
    scientific_name: "Artemisia basilica",
    link: "http://trefle.io/api/plants/275052",
    id: 275052,
    complete_data: false,
    common_name: null
  },
  {
    slug: "callichilia-basileis",
    scientific_name: "Callichilia basileis",
    link: "http://trefle.io/api/plants/218306",
    id: 218306,
    complete_data: false,
    common_name: null
  }
];

export type trefleResponseData = {
  slug: string;
  common_name: string;
  scientific_name: string;
  plant_id: number;
  user_id: number;
}[];

export const AddPlantPage = () => {
  const [queryString, setQueryString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [searchResultsLoaded, setSearchResultsLoaded] = useState(false);

  const GET_PLANTS = (value: string) => {
    // const currentPage = pageNum >= 1 ? `&page=${pageNum}` : "";
    // axios({
    //   method: "get",
    //   url:
    //     "https://cors-anywhere.herokuapp.com/" +
    //     `https://trefle.io/api/plants/?token=${
    //       process.env.REACT_APP_TREFLE_KEY
    //     }&page_size=4&q=${value}${currentPage}`,
    //   headers: { "X-Requested-With": "XMLHttpRequest" }
    // }).then(response => {
    // console.log(response.data);
    // setResponseData(response.data);
    setResponseData(mockResponse);
    setIsLoading(false);
    // });
  };

  // TODO: Debouncer if using onChange
  const handleInputChange = (value: string) => {
    setQueryString(value);
  };
  const handleSearchClick = (value: string) => (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    GET_PLANTS(value);
    setSearchResultsLoaded(true);
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
      <>
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
        <br />
        {searchResultsLoaded ? (
          <button>Return To Add A Plant</button>
        ) : (
          <>
            <div>OR</div>
            <Link to={`/user-add`}>
              <button>Add Your Own Plant</button>
            </Link>
          </>
        )}
      </>
    </div>
  );
};

export default AddPlantPage;
