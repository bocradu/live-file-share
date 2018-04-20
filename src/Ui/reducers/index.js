import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { ClientState } from "./clientReducers";
import { HostState } from "./hostReducers";

const rootReducer = combineReducers({
  ClientState,
  HostState
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
