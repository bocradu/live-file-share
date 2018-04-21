import { ipcRenderer } from "electron";
import { NAVIGATE } from "./types";
const RouteActions = {
  navigate: page => {
    return { type: NAVIGATE, payload: page };
  }
};
export { RouteActions };
