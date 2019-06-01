import React, { useState, useContext } from "react";
import styles from "./add-plant.module.scss";
import { DbPlantSearch } from "../../components/organisms/add-db-plant/add-db-plant.component";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";
import { PageWrapper } from "../../components/templates/page-wrapper/page-wrapper.component";
import { ContentWrapper } from "../../components/templates/content-wrapper/content-wrapper.component";

export const AddPlantPage = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <PageHeading title="Add a Plant" />
        <div>
          from the <a href="https://trefle.io/">Trefle Plant API</a>
        </div>
        <DbPlantSearch />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default AddPlantPage;
