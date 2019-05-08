import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import "./App.scss";
import { AppWrapper } from "./components/templates/app-wrapper/app-wrapper.component";
import Home from "./pages/home/home.page";
import Garden from "./pages/garden/garden.page";
import { AddPlantPage } from "./pages/add-plant/add-plant.page";
import { UserProfile } from "./components/organisms/user-profile/user-profile.component";
import { Header } from "./components/organisms/header/header.component";
import { Authentication } from "./components/organisms/authentication/authentication.component";
import ProtectedRoute from "./utilities/protected-route";

const App = () => {
  return (
    <Router history={history}>
      <AppWrapper>
        <Header />
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/add-plant" component={AddPlantPage} />
        <ProtectedRoute path="/garden" component={Garden} />
        <ProtectedRoute path="/account" component={UserProfile} />
      </AppWrapper>
    </Router>
  );
};

export default App;
