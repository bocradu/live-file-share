import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { ClientActions, RouteActions } from "../actions";
import "./Navigator.css";
const activeClass = "navigator-active";
class NavigatorClass extends Component {
  renderButtons() {
    const client = "client";
    const { page, clientId } = this.props;
    const buttons = _.map(this.props.clients, id => {
      return (
        <button
          className={`tab-button ${
            page === client && clientId === id ? activeClass : ""
          }`}
          key={id}
          onClick={() => {
            this.props.selectClient(id);
            this.props.navigate(client);
          }}
        >
          {id}
        </button>
      );
    });
    return buttons;
  }
  render() {
    const { page } = this.props;
    const connect = "connect";
    const host = "host";
    return (
      <div className="navigator">
        <button
          className={`tab-button ${page === host ? activeClass : ""}`}
          onClick={() => this.props.navigate(host)}
        >
          Host
        </button>
        {this.renderButtons()}
        <button
          className={`tab-button new ${page === connect ? activeClass : ""}`}
          onClick={() => this.props.navigate(connect)}
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
  const page = state.RouteState.page;
  return { clients, page, clientId: state.ClientState.selectedClient.id };
}

const Navigator = connect(mapStateToProps, {
  selectClient: ClientActions.selectClient,
  navigate: RouteActions.navigate
})(NavigatorClass);
export { Navigator };
