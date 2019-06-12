import React from "react";

import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";
import { ErrorBoundary } from "../src/components/templates/error/error.component";

storiesOf("Error Boundary", module).add("Error", () => (
  <ErrorBoundary message="ERROR">HELLO!</ErrorBoundary>
));
