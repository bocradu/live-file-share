import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import _ from "lodash";
import { ClientActions } from "../actions";
import "./Navigator.css";
class NavigatorClass extends Component {
  renderButtons() {
    const buttons = _.map(this.props.clients, id => {
      return (
        <button
          className="tab-button"
          key={id}
          onClick={() => {
            this.props.selectClient(id);
            this.props.history.push(`/client/${id}`);
          }}
        >
          {id}
        </button>
      );
    });
    return buttons;
  }
  render() {
    return (
      <div className="navigator">
        <button
          className="tab-button"
          onClick={() => this.props.history.push("/host")}
        >
          Host
        </button>
        {this.renderButtons()}
        <button
          className="tab-button new"
          onClick={() => this.props.history.push("/client/new")}
        >
          +
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const clients = _.map(state.ClientState.clients, (client, key) => {
    return key;
  });
  return { clients };
}

const Navigator = withRouter(
  connect(mapStateToProps, { selectClient: ClientActions.selectClient })(
    NavigatorClass
  )
);
export { Navigator };
