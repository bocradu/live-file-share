import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectScreen, HostScreen, ClientScreen } from "../screens";
import { Navigator } from "./Navigator";
import "./App.css";
class AppClass extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="app">
            <Navigator />
            <Switch>
              <Route path="/host" component={HostScreen} />
              <Route path="/client/new" component={ConnectScreen} />
              <Route path="/client/:id" component={ClientScreen} />
              <Route path="/" component={HostScreen} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
const App = connect()(AppClass);
export { App };
