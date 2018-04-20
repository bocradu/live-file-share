import React, { Component } from "react";
import { connect } from "react-redux";
import { ClientActions } from "../actions";
import "./RegisterPanel.css";
class ConnectPanelClass extends Component {
  state = { hostId: "" };
  onChangeId(hostId) {
    this.setState({ hostId });
  }
  render() {
    const { hostId } = this.state;
    const { connect } = this.props;
    return (
      <div className="registerPanel">
        <div className="input-group id-input">
          <input
            onChange={event => this.onChangeId(event.target.value)}
            type="text"
            className="form-control"
            value={hostId}
          />
        </div>
        <button
          className="btn copy-button"
          onClick={() => {
            connect(hostId);
            this.setState({ hostId: "" });
          }}
        >
          Connect
        </button>
      </div>
    );
  }
}

const ConnectPanel = connect(null, {
  connect: ClientActions.connect
})(ConnectPanelClass);
export { ConnectPanel };
