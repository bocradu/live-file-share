import { CONNECTED, DOWNLOAD, DISCONNECT, SELECT_CLIENT } from "../actions";
import _ from "lodash";
const INITIAL_STATE = {
  clients: {},
  selectedClient: { files: {}, id: "" }
};

const ClientState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECTED: {
      const { id, files } = action.payload;
      const clients = { ...state.clients, [id]: files };
      return { ...state, clients };
    }
    case DOWNLOAD: {
      const { id, fileId } = action.payload;
      const clients = { ...state.clients };
      const selectedClient = { ...state.selectedClient };
      clients[id][fileId].downloaded = true;
      selectedClient.files[fileId].downloaded = true;
      return { ...state, clients, selectedClient };
    }
    case DISCONNECT: {
      const hostId = action.payload;
      const clients = { ...state.clients };
      delete clients[hostId];
      return { ...state, clients };
    }
    case SELECT_CLIENT: {
      const selectedClient = {
        files: { ...state.clients[action.payload] },
        id: action.payload
      };
      return { ...state, selectedClient };
    }
    default:
      return state;
  }
};
export { ClientState };
