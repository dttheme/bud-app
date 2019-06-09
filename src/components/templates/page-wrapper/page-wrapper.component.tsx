import React, { useContext } from "react";
import styles from "./page-wrapper.module.scss";
import { DbPlantSearch } from "../../organisms/add-db-plant/add-db-plant.component";
import { UserContext } from "../../../providers/user.provider";

let pottedHerbs = "/carolyn-v-1456621-unsplash.webp",
  leafMacroOne = "/becca-lavin-564568-unsplash.webp",
  leafMacroTwo = "/nicolas-thomas-550343-unsplash.webp",
  succulentMacro = "/annie-spratt-42051-unsplash_edit.webp",
  potsOnWall = "/adrien-olichon-1626567-unsplash.webp",
  greenhouse = "/abigail-lynn-423971-unsplash.webp";

var backgroundArray = [
  pottedHerbs,
  leafMacroOne,
  leafMacroTwo,
  succulentMacro,
  potsOnWall,
  greenhouse
];
function getRandomImage(imgAr, path?) {
  path = path || `images`; // default path here
  var num = Math.floor(Math.random() * imgAr.length);
  var img = imgAr[num];
  return path + img;
}

export const PageWrapper = props => {
  const user = useContext(UserContext);
  // console.log(user);
  return (
    <div
      className={styles.pageWrapper}
      style={{
        backgroundImage: `url(${getRandomImage(backgroundArray)})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      {user.user === null ? null : <DbPlantSearch />}
      {props.children}
    </div>
  );
};
