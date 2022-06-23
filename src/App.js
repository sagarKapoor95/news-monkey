import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0
    }
  }

  setProgress = (progress) => {
  this.setState({progress: progress});
}

  render() {
    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
        color='#f11946'
        height= {3}
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(100)}
      />
        <Switch>
          <Route exact path={"/"}><News setProgress = {this.setProgress} key = {"general1"} pageSize={5} category={"science"} country={"in"}/></Route>
          <Route exact path={"/about"}><News setProgress = {this.setProgress} key = {"about"} pageSize={5} category={"general"} country={"in"}/></Route>
          <Route exact path={"/business"}><News setProgress = {this.setProgress} key = {"business"} pageSize={5} category={"business"} country={"in"}/></Route>
          <Route exact path={"/entertainment"}><News setProgress = {this.setProgress} key = {"entertainment"} pageSize={5} category={"entertainment"} country={"in"}/></Route>
          <Route exact path={"/general"}><News setProgress = {this.setProgress} key = {"general"} pageSize={5} category={"general"} country={"in"}/></Route>
          <Route exact path={"/health"}><News setProgress = {this.setProgress} key = {"health"} pageSize={5} category={"health"} country={"in"}/></Route>
          <Route exact path={"/science"}><News setProgress = {this.setProgress} key = {"science"} pageSize={5} category={"science"} country={"in"}/></Route>
          <Route exact path={"/sports"}><News setProgress = {this.setProgress} key = {"sports"} pageSize={5} category={"sports"} country={"in"}/></Route>
          <Route exact path={"/technology"}><News setProgress = {this.setProgress} key = {"technology"} pageSize={5} category={"technology"} country={"in"}/></Route>
        </Switch>
        </Router>
      </div>
    );
  }
}