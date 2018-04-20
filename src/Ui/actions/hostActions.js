import { ipcRenderer } from "electron";
import { REGISTERED, ADD_FILES, REMOVE_FILE, STOP } from "./types";
import _ from "lodash";
const HostActions = {
  register: () => dispatch => {
    ipcRenderer.send("host:register");
    ipcRenderer.on("host:register", (event, id) => {
      dispatch({ type: REGISTERED, payload: id });
    });
  },
  addFiles: files => {
    const addedfiles = {};
    _.forEach(files, file => {
      addedfiles[file.id] = file;
    });
    ipcRenderer.send("host:shareFile", addedfiles);
    return { type: ADD_FILES, payload: addedfiles };
  },
  removeFile: id => {
    ipcRenderer.send("host:removeFile", id);
    return { type: REMOVE_FILE, payload: id };
  },
  disconnect: () => {
    ipcRenderer.send("host:stop");
    return { type: STOP };
  },
  getId: () => () => {
    ipcRenderer.send("host:id");
    ipcRenderer.on("host:id", () => {
      dispatch({ type: GET_ID });
    });
  },
  openFile: path => {
    ipcRenderer.send("open-file-host", path);
    return { type: "" };
  },
  openFolder: path => {
    ipcRenderer.send("open-folder-host", path);
    return { type: "" };
  }
};
export { HostActions };
