import React, { Component } from "react";
import { connect } from "react-redux";
import { ClientActions } from "../actions";
import "./RegisterPanel.css";
class DisconnectPanelClass extends Component {
  render() {
    const { disconnect, id } = this.props;
    return (
      <div className="registerPanel">
        <div className="input-group id-input">
          <input type="text" className="form-control" value={id} readOnly />
        </div>
        <button className="btn copy-button" onClick={() => disconnect(id)}>
          Disconnect
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { id: state.ClientState.selectedClient.id };
}
const DisconnectPanel = connect(mapStateToProps, {
  disconnect: ClientActions.disconnect
})(DisconnectPanelClass);
export { DisconnectPanel };
