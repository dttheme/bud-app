import * as React from "react";
import styles from "./garden.module.scss";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";
import { PageWrapper } from "../../components/templates/page-wrapper/page-wrapper.component";
import { PlantList } from "../../components/templates/plant-list/plant-list.component";
import { ContentWrapper } from "../../components/templates/content-wrapper/content-wrapper.component";
export const Garden = () => {
  return (
    <PageWrapper>
      {/* <div className={styles.gardenWrapper}> */}
      <ContentWrapper>
        <PageHeading title="Garden" />
        <PlantList type="garden" />
      </ContentWrapper>
      {/* </div> */}
    </PageWrapper>
  );
};
