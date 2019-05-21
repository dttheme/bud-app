import * as React from "react";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";
import styles from "./home.module.scss";
import { PageWrapper } from "../../components/templates/page-wrapper/page-wrapper.component";

export const Home = () => (
  <PageWrapper>
    <div className={styles.homePageWrapper}>
      <div className={styles.homePageContent}>
        <p>
          Manage your plants and have a <mark>happier harvest</mark>
        </p>
      </div>
    </div>
  </PageWrapper>
);
