import React, { Component } from "react";
import { connect } from "react-redux";
import { connectToClient } from "../actions";
import { FileSelectScreen } from "./FileSelectScreen";
import { RegisterPanel, HostFileList } from "../components";
import "./HostScreen.css";
class HostScreenClass extends Component {
  render() {
    return (
      <div className="hostScreen">
        <RegisterPanel />
        <FileSelectScreen />
        <HostFileList />
      </div>
    );
  }
}

const HostScreen = connect(null, { connectToClient })(HostScreenClass);

export { HostScreen };
