import { REGISTERED, ADD_FILES, REMOVE_FILE, STOP } from "../actions";

const INITIAL_STATE = {
  hosting: false,
  files: {},
  id: "",
  hasFiles: false
};

const HostState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTERED:
      return { ...state, hosting: true, id: action.payload };
    case ADD_FILES: {
      const newFiles = { ...action.payload };
      return { ...state, files: newFiles, hasFiles: true };
    }
    case REMOVE_FILE: {
      const files = { ...state.files };
      delete files[action.payload];
      return { ...state, files };
    }
    case STOP:
      return { ...state, hosting: false, files: {} };
    default:
      return state;
  }
};
export { HostState };
