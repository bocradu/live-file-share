import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonActions, HostActions } from "../actions";
import "./RegisterPanel.css";
class RegisterPanelClass extends Component {
  render() {
    const { hosting, id, register, copyToClipboard } = this.props;
    return (
      <div className="registerPanel">
        <div className="input-group id-input">
          <input
            type="text"
            readOnly
            className="form-control"
            value={id}
            hidden={!hosting}
          />
        </div>
        <button
          className="btn copy-button"
          onClick={() => (hosting ? copyToClipboard(id) : register())}
        >
          {hosting ? "Copy" : "Register"}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { id: state.HostState.id, hosting: state.HostState.hosting };
}
const RegisterPanel = connect(mapStateToProps, {
  copyToClipboard: CommonActions.copyToClipboard,
  register: HostActions.register
})(RegisterPanelClass);
export { RegisterPanel };
