import * as React from "react";
import { PageHeading } from "../../components/atoms/page-header/page-header.component";
import { Authentication } from "../../components/organisms/authentication/authentication.component";
import { AppContext } from "../../providers/app.provider";

class Home extends React.Component {
  render() {
    return (
      <div>
        <PageHeading title="HOME!" />
      </div>
    );
  }
}

export default Home;
