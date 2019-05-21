import axios from "axios";
import React, { useContext, useState } from "react";
import styles from "./add-db-plant.module.scss";
import { Button } from "../../atoms/button/button.component";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper.component";
import { Link } from "react-router-dom";
import { PlantDataType } from "../../../providers/garden.provider";
import { PlantList } from "../../templates/plant-list/plant-list.component";
import { UserContext } from "../../../providers/user.provider";

type dbPaginationProps = {
  handlePaginationClick: Function;
  pageNum: number;
  responseDataLength: number;
};

const SorryNotFound = ({ tryAgain }) => (
  <>
    <div className="searchSorry">Sorry, we couldn't find that plant</div>
    <button onClick={tryAgain}>Search Again</button>
  </>
);

const DbPagination = ({
  handlePaginationClick,
  pageNum,
  responseDataLength
}: dbPaginationProps) => (
  <>
    {pageNum > 0 ? (
      <IconWrapper
        ariaLabel="Previous results page"
        onClick={handlePaginationClick("decrement")}
      >
        👈
      </IconWrapper>
    ) : null}
    {responseDataLength == 4 ? (
      <IconWrapper
        ariaLabel="Next results page"
        onClick={handlePaginationClick("increment")}
      >
        👉
      </IconWrapper>
    ) : null}
  </>
);

export const DbPlantSearch = () => {
  const [queryString, setQueryString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [searchResultsLoaded, setSearchResultsLoaded] = useState(false);
  const user = useContext(UserContext);

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
    <div>
      <form>
        {searchResultsLoaded ? null : (
          <>
            <input
              placeholder="Search plant database..."
              type="text"
              name="search input"
              value={queryString}
              onChange={e => handleInputChange(e.target.value)}
            />
            <Button
              className={styles.searchButton}
              onClick={handleSearchClick(queryString)}
            >
              Search
            </Button>
          </>
        )}
      </form>
      {isLoading ? (
        <IconWrapper ariaLabel="Loading results...">
          <div className={styles.loadingFlower}>🌼</div>
        </IconWrapper>
      ) : (
        <div className={styles.plantListWrapper}>
          {searchResultsLoaded && responseData.length == 0
            ? SorryNotFound({ tryAgain })
            : PlantList({
                plantDataArray: responseData,
                type: "search"
              })}
        </div>
      )}
      <DbPagination
        handlePaginationClick={handlePaginationClick}
        pageNum={pageNum}
        responseDataLength={responseData.length}
      />
    </div>
  );
};
