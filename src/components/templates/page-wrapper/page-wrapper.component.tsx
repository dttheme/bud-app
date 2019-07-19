import React, { useContext, useEffect, ReactNode } from "react";
import styles from "./page-wrapper.module.scss";
import { DbPlantSearch } from "../../organisms/add-db-plant/add-db-plant.component";
import { UserContext } from "../../../providers/user.provider";

export const pottedHerbs = "images/carolyn-v-1456621-unsplash.webp",
  succulentMacro = "images/annie-spratt-42051-unsplash_edit.webp",
  potsOnWall = "images/adrien-olichon-1626567-unsplash.webp",
  greenhouse = "images/abigail-lynn-423971-unsplash.webp",
  pottedPlant = "images/lauren-mancke-60547-unsplash.webp",
  tomatoGarden = "images/www-zanda-photography-518892-unsplash.jpg",
  elephantEar = "images/sylvie-tittel-673967-unsplash.webp";

// var backgroundArray = [
//   pottedHerbs,
//   leafMacroOne,
//   leafMacroTwo,
//   succulentMacro,
//   potsOnWall,
//   greenhouse
// ];
// function getRandomImage(imgAr, path?) {
//   path = path || `images`; // default path here
//   var num = Math.floor(Math.random() * imgAr.length);
//   var img = imgAr[num];
//   return path + img;
// }

export const PageWrapper = ({
  backgroundImage,
  children
}: {
  backgroundImage?: string;
  children: ReactNode;
}) => {
  const user = useContext(UserContext);
  return (
    <div
      className={styles.pageWrapper}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      {user.user === null ? null : <DbPlantSearch />}
      {children}
    </div>
  );
};
