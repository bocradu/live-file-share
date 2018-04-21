import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectScreen, HostScreen, ClientScreen } from "../screens";
import { Navigator } from "./Navigator";
import "./App.css";
const Pages = {
  host: <HostScreen />,
  client: <ClientScreen />,
  connect: <ConnectScreen />
};
class AppClass extends Component {
  render() {
    return (
      <div>
        <div className="app">
          <Navigator />
          {Pages[this.props.page]}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.RouteState };
}

const App = connect(mapStateToProps, {})(AppClass);
export { App };
