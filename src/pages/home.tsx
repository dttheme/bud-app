import * as React from "react";
import { PageHeading } from "../components/atoms/page-header/page-header.component";
import { AppContext } from "../components/templates/app-wrapper/app-wrapper.component";
import { Authentication } from "../components/organisms/authentication/authentication.component";

class Home extends React.Component {
  render() {
    return (
      <div>
        <PageHeading title="HOME!" />
        <AppContext.Consumer>
          {state => <Authentication user={state.user} />}
        </AppContext.Consumer>
      </div>
    );
  }
}

export default Home;
