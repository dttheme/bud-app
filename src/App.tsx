import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import "./App.scss";
import { AppWrapper } from "./components/templates/app-wrapper/app-wrapper.component";
import Home from "./pages/home";
import Garden from "./pages/garden/garden.page";
import { AddPlantPage } from "./pages/add-plant/add-plant.page";

const App = () => {
  return (
    <Router history={history}>
      <AppWrapper>
        <Route exact path="/" component={Home} />
        <Route path="/add-plant" component={AddPlantPage} />
        <Route path="/garden" component={Garden} />
      </AppWrapper>
    </Router>
  );
};

export default App;
