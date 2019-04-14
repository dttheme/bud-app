import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import "./App.scss";
import { AppWrapper } from "./components/templates/app-wrapper/app-wrapper.component";
import Home from "./pages/home";
import Garden from "./pages/garden/garden.page";
import { AddPlantPage } from "./pages/add-plant/add-plant.page";
import { UserPlantAdd } from "./components/organisms/add-user-plant/add-user-plant.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Router history={history}>
          <AppWrapper>
            <Route exact path="/" component={Home} />
            <Route path="/add-plant" component={AddPlantPage} />
            <Route path="/garden" component={Garden} />
            <Route path="/user-add" component={UserPlantAdd} />
          </AppWrapper>
        </Router>
      </div>
    );
  }
}

export default App;
