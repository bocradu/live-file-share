import { CONNECTED, DOWNLOAD, DISCONNECT, SELECT_CLIENT } from "../actions";

const INITIAL_STATE = {
  clients: {},
  selectedClient: { files: {}, id: "" }
};

const ClientState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECTED: {
      const { id, files } = action.payload;
      const clients = { ...state.clients, [id]: files };
      console.log(clients);
      return { ...state, clients };
    }
    case DOWNLOAD: {
      const { id, fileId } = action.payload;
      state.clients[id][fileId].downloaded = true;
      state.selectedClient.files[fileId].downloaded = true;
      const selectedClient = { ...state.selectedClient };
      const clients = { ...state.clients };
      return { selectedClient, clients };
    }
    case DISCONNECT: {
      const hostId = action.payload;
      const clients = state.clients;
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
