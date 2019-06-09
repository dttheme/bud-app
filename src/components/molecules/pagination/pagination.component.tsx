import React from "react";
import styles from "./pagination.module.scss";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper.component";

type PaginationProps = {
  handlePaginationClick: Function;
  pageNum: number;
  responseDataLength: number;
};

export const Pagination = ({
  handlePaginationClick,
  pageNum,
  responseDataLength
}: PaginationProps) => (
  <div className={styles.pagination}>
    {pageNum > 0 ? (
      <IconWrapper
        ariaLabel="Previous results page"
        onClick={handlePaginationClick("decrement")}
      >
        👈
      </IconWrapper>
    ) : null}
    {responseDataLength == 3 ? (
      <IconWrapper
        ariaLabel="Next results page"
        onClick={handlePaginationClick("increment")}
      >
        👉
      </IconWrapper>
    ) : null}
  </div>
);
