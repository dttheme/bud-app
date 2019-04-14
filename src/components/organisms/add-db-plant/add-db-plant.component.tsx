import React from "react";
import styles from "./add-db-plant.module.scss";
import { PlantList } from "../plant-list/plant-list.component";
import { trefleResponseData } from "../../../pages/add-plant/add-plant.page";

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
      <span
        className={styles.paginationIcon}
        onClick={handlePaginationClick("decrement")}
      >
        👈
      </span>
    ) : null}
    {responseDataLength == 4 ? (
      <span
        className={styles.paginationIcon}
        onClick={handlePaginationClick("increment")}
      >
        👉
      </span>
    ) : null}
  </>
);

export const DbPlantSearch = (props: DbPlantSearchProps) => {
  const {
    handleInputChange,
    handleSearchClick,
    isLoading,
    queryString,
    responseData,
    searchResultsLoaded,
    tryAgain,
    pageNum,
    handlePaginationClick
  } = props;
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
            <button onClick={handleSearchClick(queryString)}>Search</button>
          </>
        )}
      </form>
      {isLoading ? (
        <div className={styles.loadingFlower}>🌼</div>
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
