import { ipcRenderer } from "electron";
const CommonActions = {
  log: message => {
    ipcRenderer.send("log", message);
    return { type: "" };
  },
  copyToClipboard: id => {
    ipcRenderer.send("copy", id);
    return { type: "" };
  }
};
export { CommonActions };
