import React from "react";
import styles from "./add-db-plant.module.scss";
import { PlantList } from "../plant-list/plant-list.component";
import { trefleResponseData } from "../../../pages/add-plant/add-plant.page";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper.component";
import { Button } from "../../atoms/button/button.component";

type DbPlantSearchProps = {
  searchResultsLoaded: boolean;
  queryString: string;
  handleInputChange: Function;
  handleSearchClick: Function;
  isLoading: boolean;
  responseData: trefleResponseData;
  tryAgain: Function;
  pageNum: number;
  handlePaginationClick: Function;
};

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

export const DbPlantSearch = ({
  handleInputChange,
  handleSearchClick,
  isLoading,
  queryString,
  responseData,
  searchResultsLoaded,
  tryAgain,
  pageNum,
  handlePaginationClick
}: DbPlantSearchProps) => {
  return (
    <>
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
            : PlantList({ responseData, searchResultsLoaded, type: "search" })}
        </div>
      )}
      <DbPagination
        handlePaginationClick={handlePaginationClick}
        pageNum={pageNum}
        responseDataLength={responseData.length}
      />
    </>
  );
};
