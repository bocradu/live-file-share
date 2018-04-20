import React, { Component } from "react";
import { connect } from "react-redux";
import { ConnectPanel } from "../components";
import "./ConnectScreen.css";
class ConnectScreenClass extends Component {
  render() {
    return (
      <div className="connectScreen">
        <ConnectPanel />
        <div className="placeholder video-select-screen" />
      </div>
    );
  }
}

const ConnectScreen = connect(null, {})(ConnectScreenClass);

export { ConnectScreen };
