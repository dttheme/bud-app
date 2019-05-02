import React from "react";
import styles from "./add-db-plant.module.scss";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper.component";
import { Button } from "../../atoms/button/button.component";
import { Link } from "react-router-dom";
import { PlantList } from "../../templates/plant-list/plant-list.component";
import { PlantDataType } from "../../../providers/garden.provider";

type DbPlantSearchProps = {
  searchResultsLoaded: boolean;
  queryString: string;
  handleInputChange: Function;
  handleSearchClick: Function;
  handlePaginationClick: Function;
  isLoading: boolean;
  responseData: PlantDataType[];
  tryAgain: Function;
  pageNum: number;
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
    </>
  );
};
