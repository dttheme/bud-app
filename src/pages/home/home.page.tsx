import * as React from "react";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";
import styles from "./home.module.scss";

export const Home = () => (
  <div className={styles.homePageWrapper}>
    <div className={styles.homePageContent}>
      <PageHeading title="Home" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </p>
    </div>
  </div>
);
