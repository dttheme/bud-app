import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import { PageWrapper } from "./components/templates/page-wrapper/page-wrapper.component";
import Home from "./pages/home";
import { AddPlant } from "./pages/add-plant/add-plant";
import Garden from "./pages/garden";

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
        <Router>
          <PageWrapper>
            <Route exact path="/" component={Home} />
            <Route path="/add-plant" component={AddPlant} />
            <Route path="/garden" component={Garden} />
          </PageWrapper>
        </Router>
      </div>
    );
  }
}

export default App;
