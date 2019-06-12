import * as React from "react";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";
import styles from "./home.module.scss";
import {
  PageWrapper,
  pottedPlant
} from "../../components/templates/page-wrapper/page-wrapper.component";
import { ContentWrapper } from "../../components/templates/content-wrapper/content-wrapper.component";

export const Home = () => (
  <PageWrapper backgroundImage={pottedPlant}>
    <div className={styles.homePageWrapper}>
      <ContentWrapper>
        <p className={styles.homePageContent}>
          Manage your plants and have a <mark>happier harvest</mark>.
        </p>
      </ContentWrapper>
    </div>
  </PageWrapper>
);
