import history from "../../../history";
import React from "react";
import { AddPlantPage } from "../../../pages/add-plant/add-plant.page";
import { AppWrapper } from "../../templates/app-wrapper/app-wrapper.component";
import { Garden } from "../../../pages/garden/garden.page";
import { Header } from "../header/header.component";
import { Home } from "../../../pages/home/home.page";
import { ProtectedRoute } from "../../../utilities/protected-route";
import { Route, Router } from "react-router-dom";
import { SignIn } from "../../molecules/sign-in/sign-in";
import { SignUp } from "../../molecules/sign-up/sign-up";
import { UserProfile } from "../user-profile/user-profile.component";
import "./App.module.scss";
import { Authentication } from "../authentication/authentication.component";

const App = () => {
  return (
    <Router history={history}>
      <AppWrapper>
        <Authentication />
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <ProtectedRoute path="/add-plant" component={AddPlantPage} />
        <ProtectedRoute path="/garden" component={Garden} />
        <ProtectedRoute path="/account" component={UserProfile} />
      </AppWrapper>
    </Router>
  );
};

export default App;
