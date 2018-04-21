import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { ClientState } from "./clientReducers";
import { HostState } from "./hostReducers";
import { RouteState } from "./routeReducers";

const rootReducer = combineReducers({
  ClientState,
  HostState,
  RouteState
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
