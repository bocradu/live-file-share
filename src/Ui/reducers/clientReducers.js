import {
  CONNECTED,
  DOWNLOAD,
  DISCONNECT,
  SELECT_CLIENT,
  CLIENT_REMOVE_FILE
} from "../actions";
import _ from "lodash";
const INITIAL_STATE = {
  clients: {},
  selectedClient: { files: {}, id: "" }
};

const ClientState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECTED: {
      const { id, files } = action.payload;
      return Object.assign({}, state, {
        clients: {
          ...state.clients,
          [id]: files
        },
        selectedClient: {
          ...state.selectedClient,
          id,
          files
        }
      });
    }
    case DOWNLOAD: {
      const { id, fileId } = action.payload;
      state.clients[id][fileId] = {
        ...state.clients[id][fileId],
        downloaded: true
      };
      state.clients[id] = { ...state.clients[id] };
      state.selectedClient.files = { ...state.clients[id] };
      return Object.assign({}, state, {
        clients: {
          ...state.clients
        },
        selectedClient: {
          ...state.selectedClient,
          id,
          files: { ...state.selectedClient.files }
        }
      });
    }
    case CLIENT_REMOVE_FILE: {
      const { id, fileId } = action.payload;
      delete state.clients[id][fileId];
      state.clients[id] = { ...state.clients[id] };
      state.selectedClient.files = { ...state.clients[id] };
      const newState = Object.assign({}, state, {
        clients: {
          ...state.clients
        },
        selectedClient: {
          ...state.selectedClient,
          id,
          files: { ...state.selectedClient.files }
        }
      });
      return newState;
    }
    case DISCONNECT: {
      const hostId = action.payload;
      delete state.clients[hostId];
      return state;
    }
    case SELECT_CLIENT: {
      state.selectedClient.files = state.clients[action.payload];
      state.selectedClient.id = action.payload;
      return state;
    }
    default:
      return state;
  }
};
export { ClientState };
