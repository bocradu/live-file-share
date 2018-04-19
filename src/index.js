import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./reducers";
import { ipcRenderer } from "electron";
import { App } from "./components";
import './index.css'
window.addEventListener(
  "keyup",
  e => {
    if (e.keyCode == 27) {
      ipcRenderer.send("hide");
    }
  },
  true
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
