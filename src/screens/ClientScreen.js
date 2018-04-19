import React, { Component } from "react";
import { connect } from "react-redux";
import { DisconnectPanel,ClientFileList } from "../components";
import "./ClientScreen.css";
class ClientScreenClass extends Component {
  render() {
    return (
      <div className="clientScreen">
        <DisconnectPanel />
        <ClientFileList/>
      </div>
    );
  }
}

const ClientScreen = connect(null, {})(ClientScreenClass);

export { ClientScreen };
