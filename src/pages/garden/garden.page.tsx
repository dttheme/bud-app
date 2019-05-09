import * as React from "react";
import { PlantList } from "../../components/templates/plant-list/plant-list.component";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";

export const Garden = () => {
  return (
    <div>
      <PageHeading title="Garden" />
      <PlantList type="garden" />
    </div>
  );
};
