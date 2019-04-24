import React, { createContext } from "react";
import styles from "./app-wrapper.module.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "../../atoms/tooltip/tooltip.component";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper.component";
import { firestore } from "../../../firebase";
import { collectIdsAndDocs } from "../../../utilities";

type AppWrapperType = {
  children: React.ReactNode;
};

export const AppContext = createContext([{}]);

export class AppWrapper extends React.Component<AppWrapperType> {
  state = { garden: [{}], user: null };

  unsubscribe: any = null;

  componentDidMount = async () => {
    this.unsubscribe = firestore.collection("garden").onSnapshot(snapshot => {
      const garden = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ garden });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  render() {
    return (
      <>
        <header className={styles.header}>
          <Link to="/" className={`${styles.navLink} ${styles.navText}`}>
            <h1>Plant Bud</h1>
          </Link>
          <span>
            <Link to="/add-plant" className={styles.navText}>
              <Tooltip text="Add Plant">
                <IconWrapper
                  ariaLabel="Add a plant"
                  className={styles.headerIcon}
                >
                  <span aria-label="add">➕</span>
                </IconWrapper>
              </Tooltip>
            </Link>
            <Link to="/garden" className={styles.navText}>
              <Tooltip text="Garden">
                <IconWrapper
                  ariaLabel="Go to your garden"
                  className={styles.headerIcon}
                >
                  <span aria-label="garden">🌱</span>
                </IconWrapper>
              </Tooltip>
            </Link>
          </span>
        </header>
        <div className={styles.pageWrapper}>
          <AppContext.Provider value={this.state.garden}>
            {this.props.children}
          </AppContext.Provider>
        </div>
      </>
    );
  }
}
