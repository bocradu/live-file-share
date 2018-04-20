import { ipcRenderer } from "electron";
import { CONNECTED, DOWNLOAD, DISCONNECT, SELECT_CLIENT } from "./types";
const ClientActions = {
  connect: hostId => dispatch => {
    ipcRenderer.send("client:connect", hostId);
    ipcRenderer.on("client:connect", (event, { id, files }) => {
      dispatch({ type: CONNECTED, payload: { id, files } });
    });
  },
  download: (hostId, fileId) => dispatch => {
    ipcRenderer.send("client:download", { hostId, fileId });
    ipcRenderer.on("client:download", (event, { id, fileId }) => {
      dispatch({ type: DOWNLOAD, payload: { id, fileId } });
    });
  },
  disconnect: hostId => dispatch => {
    ipcRenderer.send("client:disconnect", hostId);
    ipcRenderer.on("client:disconnect", () => {
      dispatch({ type: DISCONNECT, payload: hostId });
    });
  },
  selectClient: clientId => {
    return { type: SELECT_CLIENT, payload: clientId };
  },
  openFile: name => {
    ipcRenderer.send("open-file-client", name);
    return { type: "" };
  },
  openFolder: () => {
    ipcRenderer.send("open-folder-client");
    return { type: "" };
  }
};
export { ClientActions };
